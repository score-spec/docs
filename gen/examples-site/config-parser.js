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
        parsedConfig.data.params.exampleLibraryGitHubUrls || [],
      // exampleLibraryEnabledTabGroupTypes:
      //   parsedConfig.data.params.exampleLibraryEnabledTabGroupTypes || [],
      // exampleFileTypes: parsedConfig.data.params.exampleFileTypes || [],
      exampleLibraryBlacklistedFolders:
        parsedConfig.data.params.exampleLibraryBlacklistedFolders || [],
      exampleLibraryGitHubBaseUrl:
        parsedConfig.data.params.exampleLibraryGitHubBaseUrl || "",
    };
  } catch (error) {
    console.error("Error parsing config file:", error);
    throw error;
  }
}

module.exports = { parseConfig };
