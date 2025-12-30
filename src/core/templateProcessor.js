const fs = require('fs-extra');
const path = require('path');
const { TemplateNotFoundError, FileExistsError, CLIError } = require('../utils/errors');
const { validatePath } = require('../utils/pathUtils');

/**
 * Read and validate template file
 * @param {string} templatePath - Path to template file
 * @returns {Promise<string>} Template content
 * @throws {TemplateNotFoundError} If template doesn't exist
 * @throws {CLIError} If template is empty or invalid
 */
async function readTemplate(templatePath) {
  if (!fs.existsSync(templatePath)) {
    throw new TemplateNotFoundError(path.basename(templatePath, path.extname(templatePath)));
  }

  const content = await fs.readFile(templatePath, 'utf-8');
  
  if (!content || content.trim().length === 0) {
    throw new CLIError(`Template file is empty: ${templatePath}`, 'EMPTY_TEMPLATE');
  }

  return content;
}

/**
 * Write file with validation
 * @param {string} targetPath - Target file path
 * @param {string} content - File content
 * @param {string} baseDir - Base directory for validation
 * @param {boolean} overwrite - Whether to overwrite existing file
 * @param {Function} onExists - Optional callback when file exists (returns Promise<boolean>)
 * @throws {FileExistsError} If file exists and overwrite is false and onExists is not provided
 * @throws {CLIError} If path validation fails
 */
async function writeFile(targetPath, content, baseDir, overwrite = false, onExists = null) {
  // Validate path
  const validatedPath = validatePath(targetPath, baseDir);
  
  // Check if file exists
  if (fs.existsSync(validatedPath) && !overwrite) {
    // If callback is provided, use it to ask user
    if (onExists && typeof onExists === 'function') {
      const shouldOverwrite = await onExists(validatedPath);
      if (!shouldOverwrite) {
        throw new FileExistsError(validatedPath);
      }
      // User confirmed, proceed with overwrite
    } else {
      throw new FileExistsError(validatedPath);
    }
  }

  // Ensure directory exists
  await fs.ensureDir(path.dirname(validatedPath));

  // Write file
  await fs.writeFile(validatedPath, content, 'utf-8');
  
  return validatedPath;
}

/**
 * List available templates in a directory
 * @param {string} templateDir - Template directory
 * @returns {Array<string>} Array of template names (without extension)
 */
function listTemplates(templateDir) {
  if (!fs.existsSync(templateDir)) {
    return [];
  }

  try {
    const files = fs.readdirSync(templateDir);
    return files
      .filter(file => {
        const filePath = path.join(templateDir, file);
        return fs.statSync(filePath).isFile() && 
               (file.endsWith('.tsx') || file.endsWith('.ts'));
      })
      .map(file => path.basename(file, path.extname(file)));
  } catch (error) {
    return [];
  }
}

module.exports = {
  readTemplate,
  writeFile,
  listTemplates,
};

