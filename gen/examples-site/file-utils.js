const fs = require("fs");
const path = require("path");

const isDirectory = (path) => fs.statSync(path).isDirectory();

const mkdirIfNotExistsSync = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

/**
 * Check if a folder should be ignored (starts with a dot)
 * @param {string} folderName - Name of the folder
 * @returns {boolean} - True if folder should be ignored
 */
const shouldIgnoreFolder = (folderName) => {
  return folderName.startsWith(".");
};

/**
 * Recursively traverse a directory and apply a callback to each file
 * @param {string} dir - Directory to traverse
 * @param {Function} callback - Function to call for each file
 */
function traverseDirectory(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (isDirectory(filePath)) {
      traverseDirectory(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

module.exports = {
  isDirectory,
  mkdirIfNotExistsSync,
  traverseDirectory,
  shouldIgnoreFolder,
};
