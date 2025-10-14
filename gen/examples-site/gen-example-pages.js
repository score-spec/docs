const fs = require("fs");
const { buildFrontmatter } = require("./frontmatter");
const { parseConfig } = require("./config-parser");
const {
  isDirectory,
  mkdirIfNotExistsSync,
  shouldIgnoreFolder,
} = require("./file-utils");
const { beautify } = require("./content-utils");

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
categoryFolders.forEach((folder, index) => {
  if (blacklist.includes(folder)) {
    categoryFolders.splice(index, 1);
  }
});

//For each folder, make a folder in ./content/examples:
for (const categoryFolder of categoryFolders) {
  mkdirIfNotExistsSync(`./content/en/examples/${categoryFolder}`);

  //Write an _index.md file in each folder.
  //Get content from examples-site category content files
  const categoryIndexContent = fs.readFileSync(
    `./gen/examples-site/examples-category-content/${categoryFolder}.md`,
    "utf8"
  );
  fs.writeFileSync(
    `./content/en/examples/${categoryFolder}/_index.md`,
    `---
title: "${beautify(categoryFolder)}"
draft: false
type: examples
---
${categoryIndexContent}

---`
  );

  //Get the folders inside each category:
  const folders = fs.readdirSync(`${sourceFolder}/${categoryFolder}`);

  //For each folder, check if this is the last nesting level:
  for (const folder of folders) {
    //Discard readme and other files:
    if (
      !isDirectory(`${sourceFolder}/${categoryFolder}/${folder}`) ||
      shouldIgnoreFolder(folder)
    ) {
      continue;
    }
    const isLastNestingLevel = !fs
      .readdirSync(`${sourceFolder}/${categoryFolder}/${folder}`)
      .some((file) =>
        isDirectory(`${sourceFolder}/${categoryFolder}/${folder}/${file}`)
      );

    if (!isLastNestingLevel) {
      const subfolders = fs.readdirSync(
        `${sourceFolder}/${categoryFolder}/${folder}`
      );
      const folderPath = `./content/en/examples/${categoryFolder}/${folder}`;
      for (const subfolder of subfolders) {
        mkdirIfNotExistsSync(folderPath);
        //Discard readme and other files, and dot folders:
        if (
          !isDirectory(
            `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
          ) ||
          shouldIgnoreFolder(subfolder)
        ) {
          continue;
        }

        const isLastNestingLevel = !fs
          .readdirSync(
            `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
          )
          .some((file) =>
            isDirectory(
              `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}/${file}`
            )
          );

        if (!isLastNestingLevel) {
          const subsubfolders = fs.readdirSync(
            `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}`
          );
          const subfolderPath = `${folderPath}/${subfolder}`;
          for (const subsubfolder of subsubfolders) {
            mkdirIfNotExistsSync(subfolderPath);
            //Discard readme and other files, and dot folders:
            if (
              !isDirectory(
                `${sourceFolder}/${categoryFolder}/${folder}/${subfolder}/${subsubfolder}`
              ) ||
              shouldIgnoreFolder(subsubfolder)
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
        const path = `${sourceFolder}/${categoryFolder}/${folder}`;
        const files = fs.readdirSync(path);
        // Create output directory structure
        mkdirIfNotExistsSync(
          `./content/en/examples/${categoryFolder}/${folder}`
        );
        for (const file of files) {
          const fileWithoutExtension = file.replace(/\.[^/.]+$/, "");
          mkdirIfNotExistsSync(`${path}/${fileWithoutExtension}`);
          fs.renameSync(
            `${path}/${file}`,
            `${path}/${fileWithoutExtension}/${file}`
          );
          buildFrontmatter(
            fileWithoutExtension,
            `${categoryFolder}/${folder}/${fileWithoutExtension}`,
            folder,
            "",
            {
              fileLocation: `${categoryFolder}/${folder}`,
              shouldBeautifyParent: false,
            }
          );
        }
        // Move files back to their original location
        for (const file of files) {
          const fileWithoutExtension = file.replace(/\.[^/.]+$/, "");
          fs.renameSync(
            `${path}/${fileWithoutExtension}/${file}`,
            `${path}/${file}`
          );
          console.log(`${path}/${fileWithoutExtension}`);
          fs.rmdirSync(`${path}/${fileWithoutExtension}`);
        }
      } else {
        buildFrontmatter(folder, `${categoryFolder}/${folder}`);
      }
    }
  }
}
