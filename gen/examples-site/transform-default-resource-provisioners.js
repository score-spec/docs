const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const scoreComposeDir = path.join(
  __dirname,
  "../external-content/resource-provisioners/default/score-compose"
);
const scoreK8sDir = path.join(
  __dirname,
  "../external-content/resource-provisioners/default/score-k8s"
);

const directories = [scoreComposeDir, scoreK8sDir];

function cleanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const items = fs.readdirSync(dirPath);
  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else if (stats.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (ext !== ".yaml" && ext !== ".yml") {
        fs.unlinkSync(fullPath);
      }
    }
  });
}

function extractProvisionerSection(content, uri) {
  const lines = content.split("\n");
  let startIdx = -1;
  let endIdx = -1;
  let commentStartIdx = -1;

  // Find the line with the URI
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`- uri: ${uri}`)) {
      startIdx = i;

      // Go backwards to find the start of comments
      commentStartIdx = i - 1;
      while (
        commentStartIdx >= 0 &&
        lines[commentStartIdx].trim().startsWith("#")
      ) {
        commentStartIdx--;
      }
      commentStartIdx++; // Move to the first comment line

      // Find the end of this provisioner (next "- uri:" or end of file)
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].match(/^- uri:/)) {
          // Found the next provisioner, now go backwards to find where its comments start
          let commentStart = j - 1;
          while (
            commentStart > i &&
            lines[commentStart].trim().startsWith("#")
          ) {
            commentStart--;
          }
          endIdx = commentStart + 1;
          break;
        }
      }
      if (endIdx === -1) {
        endIdx = lines.length;
      }
      break;
    }
  }

  if (startIdx === -1) {
    return { yamlContent: null, comments: null };
  }

  // Extract the provisioner YAML (without leading comments)
  const yamlLines = lines.slice(startIdx, endIdx);
  const yamlContent = yamlLines.join("\n").trim();

  // Extract just the comments for README
  const commentLines = lines.slice(commentStartIdx, startIdx);
  const comments = commentLines
    .map((line) => line.trim().replace(/^#\s?/, ""))
    .join(" ")
    .trim();

  return { yamlContent, comments };
}

function splitProvisionersFile(sourceFile, baseDir, implementation) {
  const content = fs.readFileSync(sourceFile, "utf8");

  // Parse YAML to get the list of provisioners and their URIs
  const parsed = matter(`---\n${content}\n---`);
  const provisioners = parsed.data;

  if (!Array.isArray(provisioners)) {
    console.error(`Expected array in ${sourceFile}`);
    return;
  }

  provisioners.forEach((provisioner, index) => {
    if (!provisioner.uri) {
      console.warn(
        `Provisioner at index ${index} in ${sourceFile} has no uri, skipping`
      );
      return;
    }

    // Extract folder name from URI
    const uriParts = provisioner.uri.split("/");
    let folderName = uriParts[uriParts.length - 1];
    if (!folderName) {
      console.warn(
        `Provisioner at index ${index} in ${sourceFile} has invalid uri, skipping`
      );
      return;
    }
    // Handle URIs with # (e.g., cmd://bash#example-provisioner)
    if (folderName.includes("#")) {
      folderName = folderName.split("#")[1];
    }

    const targetDir = path.join(baseDir, "..", folderName, implementation);

    // Create directory if it doesn't exist
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, "provisioners.yaml");

    // Extract the raw YAML section from the original file
    const { yamlContent, comments } = extractProvisionerSection(
      content,
      provisioner.uri
    );

    if (yamlContent) {
      fs.writeFileSync(targetFile, yamlContent, "utf8");

      // Create README.md with comments
      if (comments) {
        const readmeFile = path.join(targetDir, "README.md");
        fs.writeFileSync(readmeFile, comments, "utf8");
      }
    } else {
      console.warn(`Could not extract YAML for ${provisioner.uri}`);
    }
  });
}

// Clean directories first
directories.forEach((dir) => {
  cleanDirectory(dir);
});

// Split the provisioners files
const scoreComposeYaml = path.join(
  scoreComposeDir,
  "default.provisioners.yaml"
);
const scoreK8sYaml = path.join(scoreK8sDir, "zz-default.provisioners.yaml");

if (fs.existsSync(scoreComposeYaml)) {
  splitProvisionersFile(scoreComposeYaml, scoreComposeDir, "score-compose");
}

if (fs.existsSync(scoreK8sYaml)) {
  splitProvisionersFile(scoreK8sYaml, scoreK8sDir, "score-k8s");
}

fs.rmSync(scoreComposeDir, { recursive: true, force: true });
fs.rmSync(scoreK8sDir, { recursive: true, force: true });
