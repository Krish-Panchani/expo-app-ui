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

// Cache the package directory to avoid repeated lookups
let cachedPackageDir = null;

/**
 * Get package directory - works from any context
 * @returns {string} Package directory path
 */
function getPackageDir() {
  // Return cached value if available
  if (cachedPackageDir) {
    return cachedPackageDir;
  }
  
  // Strategy 1: Use require.main.filename (works when running as CLI via npx or node)
  // When running via npx, require.main points to the bin script
  try {
    if (require.main && require.main.filename) {
      let currentDir = path.dirname(require.main.filename);
      
      // Search up from bin script location
      let depth = 0;
      while (currentDir !== path.dirname(currentDir) && depth < 10) {
        const packageJsonPath = path.join(currentDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const pkg = fs.readJsonSync(packageJsonPath);
            if (pkg.name === 'expo-app-ui') {
              const templatesPath = path.join(currentDir, 'templates');
              if (fs.existsSync(templatesPath)) {
                cachedPackageDir = currentDir;
                return cachedPackageDir;
              }
            }
          } catch (err) {
            // Continue searching
          }
        }
        currentDir = path.dirname(currentDir);
        depth++;
      }
    }
  } catch (error) {
    // Continue to next strategy
  }
  
  // Strategy 2: Try require.resolve for package.json (works when installed via npm/npx)
  try {
    const packageJsonPath = require.resolve('expo-app-ui/package.json', { paths: [process.cwd(), __dirname] });
    cachedPackageDir = path.dirname(packageJsonPath);
    // Verify it has templates directory
    const templatesPath = path.join(cachedPackageDir, 'templates');
    if (fs.existsSync(templatesPath)) {
      return cachedPackageDir;
    }
  } catch (error) {
    // Continue to next strategy
  }
  
  // Strategy 3: Use relative path from current file (works for local development)
  try {
    // Go up from src/utils/pathUtils.js to package root
    let currentDir = path.dirname(path.dirname(__dirname));
    
    const packageJsonPath = path.join(currentDir, 'package.json');
    const templatesPath = path.join(currentDir, 'templates');
    if (fs.existsSync(packageJsonPath) && fs.existsSync(templatesPath)) {
      try {
        const pkg = fs.readJsonSync(packageJsonPath);
        if (pkg.name === 'expo-app-ui') {
          cachedPackageDir = currentDir;
          return cachedPackageDir;
        }
      } catch (err) {
        // Continue to next strategy
      }
    }
  } catch (error) {
    // Continue to next strategy
  }
  
  // Strategy 3: Search from current file's directory
  let currentDir = __dirname;
  
  // If we're in src/utils or src/commands, go up two levels
  if (currentDir.endsWith(path.join('src', 'utils')) || currentDir.endsWith(path.join('src', 'commands'))) {
    currentDir = path.dirname(path.dirname(currentDir));
  } else if (currentDir.includes(path.sep + 'src' + path.sep)) {
    currentDir = path.dirname(currentDir);
  }
  
  // Verify and search up if needed
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = fs.readJsonSync(packageJsonPath);
        if (pkg.name === 'expo-app-ui') {
          cachedPackageDir = currentDir;
          return cachedPackageDir;
        }
      } catch (err) {
        // Continue searching
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Final fallback (shouldn't normally reach here)
  if (__dirname.includes('src')) {
    cachedPackageDir = path.dirname(path.dirname(__dirname));
  } else {
    cachedPackageDir = path.dirname(__dirname);
  }
  
  return cachedPackageDir;
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
