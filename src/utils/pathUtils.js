const path = require('path');
const fs = require('fs-extra');
const { InvalidInputError, CLIError } = require('./errors');

/**
 * Convert string to kebab-case
 * @param {string} str - Input string
 * @returns {string} kebab-case string
 * @throws {InvalidInputError} If input is not a string
 */
function toKebabCase(str) {
  if (typeof str !== 'string') {
    throw new InvalidInputError('Expected string input');
  }
  if (str.trim().length === 0) {
    throw new InvalidInputError('Input cannot be empty');
  }
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert kebab-case to PascalCase
 * @param {string} str - kebab-case string
 * @returns {string} PascalCase string
 * @throws {InvalidInputError} If input is not a string
 */
function toPascalCase(str) {
  if (typeof str !== 'string') {
    throw new InvalidInputError('Expected string input');
  }
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Validate file path to prevent path traversal attacks
 * @param {string} filePath - File path to validate
 * @param {string} baseDir - Base directory
 * @returns {string} Resolved absolute path
 * @throws {CLIError} If path traversal is detected
 */
function validatePath(filePath, baseDir) {
  const resolved = path.resolve(baseDir, filePath);
  const baseResolved = path.resolve(baseDir);
  
  if (!resolved.startsWith(baseResolved)) {
    throw new CLIError('Invalid file path: path traversal detected', 'PATH_TRAVERSAL');
  }
  
  return resolved;
}

/**
 * Get package directory - works from any context
 * @returns {string} Package directory path
 */
function getPackageDir() {
  // Start from the current file's directory
  let currentDir = __dirname;
  
  // If we're in src/utils, go up to project root
  // If we're in bin/, go up to project root
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = fs.readJsonSync(packageJsonPath);
        if (pkg.bin && (pkg.bin['expo-app-ui'] || pkg.name === 'expo-app-ui')) {
          return currentDir;
        }
      } catch (error) {
        // Continue searching
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback: if we're in src/utils, go up two levels
  if (__dirname.includes('src')) {
    return path.dirname(path.dirname(__dirname));
  }
  
  // If we're in bin/, go up one level
  return path.dirname(__dirname);
}

/**
 * Get project root directory
 * @param {number} maxDepth - Maximum depth to search
 * @returns {string} Project root path
 * @throws {CLIError} If project root not found
 */
function getProjectRoot(maxDepth = 10) {
  let currentDir = process.cwd();
  let depth = 0;

  while (currentDir !== path.dirname(currentDir) && depth < maxDepth) {
    if (fs.existsSync(path.join(currentDir, 'package.json')) || 
        fs.existsSync(path.join(currentDir, 'app.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
    depth++;
  }

  throw new CLIError('Could not find project root. Make sure you are in an Expo project directory.', 'PROJECT_ROOT_NOT_FOUND');
}

module.exports = {
  toKebabCase,
  toPascalCase,
  validatePath,
  getPackageDir,
  getProjectRoot,
};
