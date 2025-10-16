const fs = require("fs");
const matter = require("gray-matter");
const toml = require("toml");

function parseConfig(configPath) {
  try {
    const configContent = fs.readFileSync(configPath, "utf8");
    const parsedConfig = matter(`---toml\n${configContent}\n---`, {
      engines: {
        toml: toml.parse.bind(toml),
      },
    });
    return {
      exampleLibraryGitHubUrls:
        parsedConfig.data.Params.exampleLibraryGitHubUrls || [],
      exampleLibraryBlacklistedFolders:
        parsedConfig.data.Params.exampleLibraryBlacklistedFolders || [],
      exampleLibraryGitHubBaseUrl:
        parsedConfig.data.Params.exampleLibraryGitHubBaseUrl || "",
      exampleLibraryOnePagePerFileFolders:
        parsedConfig.data.Params.exampleLibraryOnePagePerFileFolders || [],
    };
  } catch (error) {
    console.error("Error parsing config file:", error);
    throw error;
  }
}

module.exports = { parseConfig };
