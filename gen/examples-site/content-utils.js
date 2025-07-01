const fs = require('fs');
const matter = require('gray-matter');
const hcl = require('hcl2-parser');

function parseYamlContent(content) {
  return matter(`---yaml\n${content}\n---`).data;
}

function parseTerraformContent(content) {
  return hcl.parseToObject(content);
}

function isResourceDefinition(filePath, extension) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (extension === 'yaml') {
    return content.includes('kind: Definition');
  }
  if (extension === 'tf') {
    const parsedTf = parseTerraformContent(content);
    if (parsedTf[0].resource) {
      return parsedTf[0].resource.humanitec_resource_definition;
    }
  }
  return false;
}

function getResourceDefinitionType(filePath, extension) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (extension === 'yaml') {
    const parsedYaml = parseYamlContent(content);
    return parsedYaml.entity.type;
  }
  if (extension === 'tf') {
    const parsedTf = parseTerraformContent(content);
    return Object.values(
      parsedTf[0].resource.humanitec_resource_definition
    )[0][0].type;
  }
  throw new Error(`Unsupported file extension: ${extension}`);
}

function beautify(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

module.exports = {
  isResourceDefinition,
  getResourceDefinitionType,
  beautify,
};
