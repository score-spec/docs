const fs = require("fs");
const matter = require("gray-matter");

const savedMetadataPath = "./data/examplesMeta.yml";
const aliasesPath = "./data/examplesAliases.yaml";
const aliasesFile = fs.readFileSync(aliasesPath, "utf8");
const aliases = matter(`---\n${aliasesFile}\n---`).data;

function saveMetadata(parsedFrontmatter, exampleType) {
  const savedMetadataFile = fs.readFileSync(savedMetadataPath, "utf8");
  const savedMetadata = matter(savedMetadataFile).data;

  // If the example type is not in the saved metadata, add it to the saved metadata:
  if (!savedMetadata[exampleType]) {
    savedMetadata[exampleType] = {};
  }

  for (const key in parsedFrontmatter.data) {
    if (!parsedFrontmatter.data[key]) {
      continue;
    }
    // If the key is not in the saved metadata, add it to the saved metadata as an array:
    if (!savedMetadata[exampleType][key]) {
      savedMetadata[exampleType][key] = [parsedFrontmatter.data[key]].sort();
    } else {
      // If the key is in the saved metadata and is an array, merge the arrays:
      if (Array.isArray(savedMetadata[exampleType][key])) {
        savedMetadata[exampleType][key] = Array.from(
          new Set([
            ...savedMetadata[exampleType][key],
            parsedFrontmatter.data[key],
          ])
        ).sort();
      }
    }
  }
  fs.writeFileSync(savedMetadataPath, matter.stringify("", savedMetadata));
}

function saveRDTypeToMetadata(type, title) {
  saveMetadata({ data: { types: [type] } }, title);
}

function getMetadataFromReadme(readmeContent, exampleType) {
  const parsedFrontmatter = matter(readmeContent);
  let metadata = "";

  if (Object.keys(parsedFrontmatter.data).length > 0) {
    saveMetadata(parsedFrontmatter, exampleType);
    const yamlMetadata = matter.stringify("", parsedFrontmatter.data);
    metadata = yamlMetadata.replace(/---/g, "").trim();
  }

  return { metadata, parsedFrontmatter };
}

function addAliasesToMetadata(path, existingMetadata) {
  if (aliases[`/examples/${path}`]) {
    const aliasString = matter
      .stringify("", {
        aliases: aliases[`/examples/${path}`],
      })
      .replace(/---/g, "")
      .trim();
    return existingMetadata
      ? `${existingMetadata}\n${aliasString}`
      : aliasString;
  }
  return existingMetadata;
}

function removeNonExternalLinks(content) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return content.replace(regex, (match, p1, p2) => {
    if (p2.startsWith("http://") || p2.startsWith("https://")) {
      return match;
    }
    return `\`${p1}\``;
  });
}

function getExcerpt(content) {
  const textWithoutHeadings = content
    .replace(/^\s*#+.*$/gm, "")
    .replace(/---/g, "");
  return textWithoutHeadings
    .trim()
    .split("\n\n")[0]
    .split("\r\n\r\n")[0]
    .replace(/'/g, "&#39;");
}

module.exports = {
  saveMetadata,
  saveRDTypeToMetadata,
  getMetadataFromReadme,
  addAliasesToMetadata,
  removeNonExternalLinks,
  getExcerpt,
};
