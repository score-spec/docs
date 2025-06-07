const fs = require("fs");
const { getGitHubUrl } = require("./github-utils");
const {
  getMetadataFromReadme,
  removeNonExternalLinks,
  getExcerpt,
  addAliasesToMetadata,
} = require("./metadata-utils");
const { isDirectory } = require("./file-utils");
const { beautify } = require("./content-utils");

const sourceFolder = process.argv[2];

/**
 * Generates frontmatter content for a markdown file.
 * @param {string} title - The title of the page.
 * @param {string} excerpt - The excerpt of the content.
 * @param {string} content - The main content of the page.
 * @param {string} metadata - Additional metadata for the frontmatter.
 * @param {string} [parent] - The parent page, if applicable.
 * @param {string} [flavor] - The flavor of the example, if applicable.
 * @returns {string} The generated frontmatter content.
 */
const generateFrontmatterContent = (
  title,
  excerpt,
  content,
  metadata,
  parent,
  flavor
) => {
  return `---
title: "${beautify(title)}"
draft: false
mermaid: true
excerpt: '${excerpt}'
hasMore: ${excerpt !== content.trim() ? "true" : "false"}
${parent ? `parent: "${beautify(parent)}"\n` : ""}${
    flavor ? `flavor: "${beautify(flavor)}"\n` : ""
  }${metadata}
---

${content}`;
};

/**
 * Generates content for an example file using the example-file shortcode.
 * @param {string} file - The filename of the example file.
 * @param {string} dir - The directory containing the file.
 * @param {string} githubUrl - The GitHub URL for the file.
 * @returns {string} The generated example file content.
 */
const generateExampleFileContent = (file, dir, githubUrl) => {
  return `{{% example-file filename="${file}" dir="${dir}" githubUrl="${githubUrl}" %}}`;
};

/**
 * Processes the README.md file in the given path and extracts metadata, content, and excerpt.
 * @param {string} path - The path to the directory containing the README.md file.
 * @returns {Object} An object containing excerpt, content, and metadata.
 */
const processReadme = (path) => {
  let excerpt = "";
  let content = "";
  let metadata = "";
  if (fs.existsSync(`${sourceFolder}/${path}/README.md`)) {
    const readme = fs.readFileSync(`${sourceFolder}/${path}/README.md`, "utf8");
    const { metadata: readmeMetadata, parsedFrontmatter } =
      getMetadataFromReadme(readme, path.split("/")[0]);
    metadata = readmeMetadata;
    content = removeNonExternalLinks(parsedFrontmatter.content);
    excerpt = getExcerpt(content);
  }
  return { excerpt, content, metadata };
};

/**
 * Writes content to a file in the examples directory.
 * @param {string} path - The path where the file should be written.
 * @param {string} content - The content to write to the file.
 */
const writeContentToFile = (path, content) => {
  fs.writeFileSync(`./content/en/examples/${path}.md`, content);
};

/**
 * Builds frontmatter and content for an example page.
 * @param {string} title - The title of the page.
 * @param {string} path - The path to the example directory.
 * @param {string} [parent] - The parent page, if applicable.
 * @param {string} [flavor] - The flavor of the example, if applicable.
 */
const buildFrontmatter = (title, path, parent, flavor) => {
  const dir = path.replace(/\.md$/, "");
  let { excerpt, content, metadata } = processReadme(path);
  const githubUrl = getGitHubUrl(path);

  const otherFiles = fs
    .readdirSync(`${sourceFolder}/${path}`)
    .filter(
      (file) =>
        file !== "README.md" && !isDirectory(`${sourceFolder}/${path}/${file}`)
    );

  metadata = addAliasesToMetadata(path, metadata);

  const frontmatterContent = generateFrontmatterContent(
    title,
    excerpt,
    content,
    metadata,
    parent,
    flavor
  );

  const otherFilesContent = otherFiles
    .map((file) => generateExampleFileContent(file, dir, githubUrl))
    .join("\n");

  writeContentToFile(
    path,
    `${frontmatterContent}

${otherFilesContent}
`
  );

  console.log({ dir, githubUrl, excerpt, content, metadata, otherFiles });
};

module.exports = { buildFrontmatter };
