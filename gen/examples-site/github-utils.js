const { parseConfig } = require("./config-parser");

const config = parseConfig("./config.toml");
const { exampleLibraryGitHubUrls: githubUrls, exampleLibraryGitHubBaseUrl } =
  config;

/**
 * Get the base GitHub URL for a given example path
 * @param {string} path - The path of the example
 * @returns {string} The base GitHub URL for the example
 */
function getGitHubUrl(path) {
  const res = githubUrls.find((gh) => path.startsWith(gh.name));
  return res ? res.url : exampleLibraryGitHubBaseUrl;
}

module.exports = {
  getGitHubUrl,
};
