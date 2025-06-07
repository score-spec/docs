const fs = require("fs");
const { parseConfig } = require("./config-parser");
const { mkdirIfNotExistsSync } = require("./file-utils");
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
}
