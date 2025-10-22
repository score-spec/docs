const fs = require("fs");
const { buildFrontmatter } = require("./frontmatter");
const { parseConfig } = require("./config-parser");
const {
  isDirectory,
  mkdirIfNotExistsSync,
  isValidFolder,
  hasSubdirectories,
} = require("./file-utils");
const { beautify } = require("./content-utils");

// Constants
const CONTENT_OUTPUT_BASE = "./content/en/examples";
const CATEGORY_CONTENT_PATH = "./gen/examples-site/examples-category-content";
const README_FILE = "README.md";
const sourceFolder = process.argv[2];

//Get the folders inside sourceFolder:
const allfiles = fs.readdirSync(sourceFolder);
const categoryFolders = allfiles.filter((file) =>
  fs.statSync(`${sourceFolder}/${file}`).isDirectory()
);

// Access the ./config/_default/config.toml file to get the blacklisted folders:
const config = parseConfig("./config.toml");
const blacklist = config.exampleLibraryBlacklistedFolders;

// Remove blacklisted folders from the categoryFolders array:
const filteredCategoryFolders = categoryFolders.filter(
  (folder) => !blacklist.includes(folder)
);

//For each folder, make a folder in ./content/examples:
for (const categoryFolder of filteredCategoryFolders) {
  mkdirIfNotExistsSync(`${CONTENT_OUTPUT_BASE}/${categoryFolder}`);
  createCategoryIndex(categoryFolder);

  //Process the folders inside each category:
  const folders = fs.readdirSync(`${sourceFolder}/${categoryFolder}`);
  for (const folder of folders) {
    if (!isValidFolder(`${sourceFolder}/${categoryFolder}/${folder}`)) {
      continue;
    }
    const isLastNestingLevel = !hasSubdirectories(
      `${sourceFolder}/${categoryFolder}/${folder}`
    );

    if (!isLastNestingLevel) {
      const subfolders = fs.readdirSync(
        `${sourceFolder}/${categoryFolder}/${folder}`
      );
      const folderPath = `${CONTENT_OUTPUT_BASE}/${categoryFolder}/${folder}`;
      for (const subfolder of subfolders) {
        mkdirIfNotExistsSync(folderPath);
        if (
          !isValidFolder(
            `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
          )
        ) {
          continue;
        }

        const isLastNestingLevel = !hasSubdirectories(
          `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
        );

        if (!isLastNestingLevel) {
          const subsubfolders = fs.readdirSync(
            `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
          );
          const subfolderPath = `${folderPath}/${subfolder}`;
          for (const subsubfolder of subsubfolders) {
            mkdirIfNotExistsSync(subfolderPath);
            if (
              !isValidFolder(
                `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}/${subsubfolder}`
              )
            ) {
              continue;
            }

            buildFrontmatter(
              subsubfolder,
              `${categoryFolder}/${folder}/${subfolder}/${subsubfolder}`,
              subfolder,
              folder
            );
          }
        } else {
          buildFrontmatter(
            subfolder,
            `${categoryFolder}/${folder}/${subfolder}`,
            folder
          );
        }
      }
    } else {
      if (config.exampleLibraryOnePagePerFileFolders.includes(categoryFolder)) {
        processOnePagePerFileFolder(categoryFolder, folder);
      } else {
        buildFrontmatter(folder, `${categoryFolder}/${folder}`);
      }
    }
  }
}

/**
 * Process folders that need one page per file
 * Temporarily moves files into subdirectories for processing, then moves them back
 */
function processOnePagePerFileFolder(categoryFolder, folder) {
  const sourcePath = `${sourceFolder}/${categoryFolder}/${folder}`;
  const files = fs.readdirSync(sourcePath);

  // Create output directory structure
  mkdirIfNotExistsSync(`${CONTENT_OUTPUT_BASE}/${categoryFolder}/${folder}`);

  // Temporarily move files into subdirectories for processing
  for (const file of files) {
    if (file === README_FILE) continue;

    const fileWithoutExtension = file.replace(/\.[^/.]+$/, "");
    const tempDir = `${sourcePath}/${fileWithoutExtension}`;

    mkdirIfNotExistsSync(tempDir);
    fs.renameSync(`${sourcePath}/${file}`, `${tempDir}/${file}`);

    buildFrontmatter(
      fileWithoutExtension,
      `${categoryFolder}/${folder}/${fileWithoutExtension}`,
      folder,
      "",
      {
        fileLocation: `${categoryFolder}/${folder}`,
        readmeLocation: `${categoryFolder}/${folder}`,
        shouldBeautifyParent: false,
      }
    );
  }

  // Move files back to their original location
  for (const file of files) {
    if (file === README_FILE) continue;

    const fileWithoutExtension = file.replace(/\.[^/.]+$/, "");
    const tempDir = `${sourcePath}/${fileWithoutExtension}`;

    fs.renameSync(`${tempDir}/${file}`, `${sourcePath}/${file}`);
    fs.rmdirSync(tempDir);
  }
}

/**
 * Create the _index.md file for a category folder
 */
function createCategoryIndex(categoryFolder) {
  const categoryIndexContent = fs.readFileSync(
    `${CATEGORY_CONTENT_PATH}/${categoryFolder}.md`,
    "utf8"
  );

  const indexContent = `---
title: "${beautify(categoryFolder)}"
draft: false
type: examples
---
${categoryIndexContent}

---`;

  fs.writeFileSync(
    `${CONTENT_OUTPUT_BASE}/${categoryFolder}/_index.md`,
    indexContent
  );
}
