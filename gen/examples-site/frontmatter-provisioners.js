const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { getGitHubUrl } = require("./github-utils");
const {
  getMetadataFromReadme,
  removeNonExternalLinks,
  getExcerpt,
  addAliasesToMetadata,
  saveMetadata,
} = require("./metadata-utils");
const { isDirectory } = require("./file-utils");

const sourceFolder = process.argv[2];
const DEFAULT_PROVISIONER_URL_SCORE_K8S =
  "https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml";
const DEFAULT_PROVISIONER_URL_SCORE_COMPOSE =
  "https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml";

/**
 * Converts an array to YAML array format.
 * @param {Array} array - The array to convert.
 * @returns {string} The YAML array format string.
 */
const convertToYamlArray = (array) => {
  if (!array || !Array.isArray(array) || array.length === 0) return "";
  return array.map((item) => `  - ${item}`).join("\n");
};

const generateFrontmatterContent = (config) => {
  return `---
title: "${config.title}"
draft: false
mermaid: true
type: examples
source: "${config.source}"
implementation: "${config.implementation}"
resourceType: "${config.resourceType}"
provisionerType: "${config.provisionerType}"
flavor: "${config.title.split("-")[0]}"
excerpt: '${config.excerpt}'
description: '${config.description}'
${
  config.expectedOutputs ? `expectedOutputs: \n${config.expectedOutputs}\n` : ""
}${
    config.supportedParams
      ? `supportedParams: \n${config.supportedParams}\n`
      : ""
  }${config.tool ? `tool: ${config.tool}\n` : ""}hasMore: ${
    config.excerpt !== config.content.trim() ? "true" : "false"
  }
${config.metadata}
---

${config.content}`;
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
 * @param {string} dirPath - The path to the directory containing the README.md file.
 * @returns {Object} An object containing excerpt, content, and metadata.
 */
const processReadme = (dirPath) => {
  let excerpt = "";
  let content = "";
  let metadata = "";
  if (fs.existsSync(`${sourceFolder}/${dirPath}/README.md`)) {
    const readme = fs.readFileSync(
      `${sourceFolder}/${dirPath}/README.md`,
      "utf8"
    );
    const { metadata: readmeMetadata, parsedFrontmatter } =
      getMetadataFromReadme(readme, dirPath.split("/")[0]);
    metadata = readmeMetadata;
    content = removeNonExternalLinks(parsedFrontmatter.content);
    excerpt = getExcerpt(content);
    metadata = addAliasesToMetadata(dirPath, metadata);
  }
  return { excerpt, content, metadata };
};

/**
 * Writes content to a file in the examples directory.
 * @param {string} filePath - The path where the file should be written.
 * @param {string} content - The content to write to the file.
 */
const writeContentToFile = (filePath, content) => {
  const fullPath = `./content/en/examples/${filePath}.md`;
  const dirPath = path.dirname(fullPath);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(fullPath, content);
};

const generateResourceProvisionerContent = (parsedYaml) => {
  return `{{% resource-provisioner-content description="${
    parsedYaml.description
  }" type="${parsedYaml.type}" ${
    parsedYaml.supported_params
      ? `supportedParams="${parsedYaml.supported_params}"`
      : ""
  } ${
    parsedYaml.expected_outputs
      ? `expectedOutputs="${parsedYaml.expected_outputs}"`
      : ""
  } %}}`;
};

/**
 * Determines the GitHub URL for a provisioner based on type and implementation.
 * @param {string} dirPath - The path to the provisioner directory.
 * @param {Object} options - Options object containing source.
 * @param {string} implementation - The implementation type (e.g., "score-k8s", "score-compose").
 * @returns {string} The GitHub URL for the provisioner.
 */
const getProvisionerGitHubUrl = (dirPath, options, implementation) => {
  let githubUrl = getGitHubUrl(dirPath);
  if (options.source === "default") {
    if (implementation === "score-k8s") {
      githubUrl = DEFAULT_PROVISIONER_URL_SCORE_K8S;
    } else if (implementation === "score-compose") {
      githubUrl = DEFAULT_PROVISIONER_URL_SCORE_COMPOSE;
    }
  }
  return githubUrl;
};

/**
 * Builds frontmatter and content for an example page.
 * @param {string} dirPath - The path to the example directory.
 * @param {Object} [options] - Additional options for the frontmatter.
 */
const buildResourceProvisionerFiles = (
  dirPath,
  options = { source: "default" }
) => {
  // Get and parse the YAML file inside the path
  const yamlFiles = fs
    .readdirSync(`${sourceFolder}/${dirPath}`)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"));
  for (const yamlFile of yamlFiles) {
    const yamlFilePath = `${sourceFolder}/${dirPath}/${yamlFile}`;
    const yamlContent = fs.readFileSync(yamlFilePath, "utf8");
    const parsedYaml = matter(`---\n${yamlContent}\n---`).data[0];
    const implementation = dirPath.split("/").pop();
    const readmeConfig = processReadme(options.readmeLocation || dirPath);
    const dir = options.fileLocation || dirPath.replace(/\.md$/, "");
    const githubUrl = getProvisionerGitHubUrl(dirPath, options, implementation);
    const uriParts = parsedYaml.uri.split("/");
    let title = uriParts[uriParts.length - 1];
    let tool;
    // Handle URIs with # (e.g., cmd://bash#example-provisioner)
    if (title.includes("#")) {
      title = title.split("#")[1];
      tool = title.split("-")[0];
    }
    const provisionerType = parsedYaml.uri.split("://")[0];

    saveMetadata(
      {
        data: {
          source: options.source,
          implementation,
          tool,
          provisionerType,
          resourceType: parsedYaml.type,
          flavor: title.split("-")[0],
        },
      },
      "resource-provisioners"
    );

    const frontmatterContent = generateFrontmatterContent({
      ...readmeConfig,
      title,
      provisionerType,
      source: options.source,
      resourceType: parsedYaml.type,
      description: parsedYaml.description,
      implementation,
      expectedOutputs: convertToYamlArray(parsedYaml.expected_outputs),
      supportedParams: convertToYamlArray(parsedYaml.supported_params),
      tool,
    });

    writeContentToFile(
      `${dirPath}/${provisionerType}/${title}`,
      `${frontmatterContent}

${generateResourceProvisionerContent(parsedYaml)}

${generateExampleFileContent(yamlFile, dir, githubUrl)}\n
`
    );
  }
};

module.exports = { buildResourceProvisionerFiles };
