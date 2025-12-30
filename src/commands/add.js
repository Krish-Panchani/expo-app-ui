const path = require('path');
const fs = require('fs-extra');
const { toKebabCase, toPascalCase, getPackageDir } = require('../utils/pathUtils');
const { TemplateNotFoundError } = require('../utils/errors');
const { readTemplate, writeFile, listTemplates } = require('../core/templateProcessor');
const { detectDependencies } = require('../core/dependencyDetector');
const Logger = require('../utils/logger');
const Config = require('../utils/config');

/**
 * Add a helper file
 */
async function addHelper(helperName, options = {}) {
  const logger = options.logger || new Logger();
  const config = options.config;
  const projectRoot = config.projectRoot;
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  
  const kebabName = toKebabCase(helperName);
  const templatePath = path.join(templatesDir, 'helpers', `${kebabName}.ts`);
  const targetPath = path.join(config.getHelpersDir(), `${kebabName}.ts`);

  try {
    logger.debug(`Looking for template: ${templatePath}`);
    
    const content = await readTemplate(templatePath);
    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false
    );

    if (!options.silent) {
      logger.success(`Added ${helperName} helper to ${path.relative(projectRoot, validatedPath)}`);
    }
    
    return true;
  } catch (error) {
    if (error instanceof TemplateNotFoundError) {
      logger.error(`Helper "${helperName}" not found.`);
      
      const helpersTemplateDir = path.join(templatesDir, 'helpers');
      const helpers = listTemplates(helpersTemplateDir);
      
      if (helpers.length > 0) {
        logger.warning('\nAvailable helpers:');
        helpers.forEach(helper => {
          logger.gray(`  - ${helper}`);
        });
      }
      throw error;
    }
    throw error;
  }
}

/**
 * Add a constants file
 */
async function addConstant(constantName, options = {}) {
  const logger = options.logger || new Logger();
  const config = options.config;
  const projectRoot = config.projectRoot;
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  
  const kebabName = toKebabCase(constantName);
  const templatePath = path.join(templatesDir, 'constants', `${kebabName}.ts`);
  const targetPath = path.join(config.getConstantsDir(), `${kebabName}.ts`);

  try {
    logger.debug(`Looking for template: ${templatePath}`);
    
    let content = await readTemplate(templatePath);
    
    // Auto-add normalizeSize dependency for theme.ts
    if (kebabName === 'theme') {
      const normalizeSizePath = path.join(config.getHelpersDir(), 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        if (!options.silent) {
          logger.info('Adding normalizeSize helper (required dependency for theme)...');
        }
        await addHelper('normalizeSize', {
          logger,
          config,
          silent: true,
          overwrite: false,
        });
      }
    }

    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false
    );

    if (!options.silent) {
      logger.success(`Added ${constantName} constant to ${path.relative(projectRoot, validatedPath)}`);
    }
    
    return true;
  } catch (error) {
    if (error instanceof TemplateNotFoundError) {
      logger.error(`Constant "${constantName}" not found.`);
      
      const constantsTemplateDir = path.join(templatesDir, 'constants');
      const constants = listTemplates(constantsTemplateDir);
      
      if (constants.length > 0) {
        logger.warning('\nAvailable constants:');
        constants.forEach(constant => {
          logger.gray(`  - ${constant}`);
        });
      }
      throw error;
    }
    throw error;
  }
}

/**
 * Add a component
 */
async function addComponent(componentName, options = {}) {
  const logger = options.logger || new Logger();
  const config = options.config;
  const projectRoot = config.projectRoot;
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  
  const kebabName = toKebabCase(componentName);
  const templatePath = path.join(templatesDir, `${kebabName}.tsx`);
  const targetPath = path.join(config.getComponentsDir(), `${toPascalCase(kebabName)}.tsx`);

  try {
    logger.debug(`Looking for template: ${templatePath}`);
    
    const content = await readTemplate(templatePath);
    
    // Detect dependencies
    const dependencies = detectDependencies(content);
    
    // Auto-add dependencies if needed
    const dependenciesToAdd = [];
    
    if (dependencies.needsNormalizeSize) {
      const normalizeSizePath = path.join(config.getHelpersDir(), 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        dependenciesToAdd.push('normalizeSize helper');
      }
    }

    if (dependencies.needsTheme) {
      const themePath = path.join(config.getConstantsDir(), 'theme.ts');
      if (!fs.existsSync(themePath)) {
        dependenciesToAdd.push('theme constants');
      }
    }

    // Show summary of what will be added
    if (dependenciesToAdd.length > 0) {
      logger.info(`\nDetected dependencies: ${dependenciesToAdd.join(', ')}`);
      logger.debug('Adding required dependencies...\n');
    }

    // Add dependencies
    if (dependencies.needsNormalizeSize) {
      const normalizeSizePath = path.join(config.getHelpersDir(), 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        await addHelper('normalizeSize', {
          logger,
          config,
          silent: true,
          overwrite: false,
        });
      }
    }

    if (dependencies.needsTheme) {
      const themePath = path.join(config.getConstantsDir(), 'theme.ts');
      if (!fs.existsSync(themePath)) {
        await addConstant('theme', {
          logger,
          config,
          silent: true,
          overwrite: false,
        });
      }
    }

    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false
    );

    logger.success(`Added ${componentName} component to ${path.relative(projectRoot, validatedPath)}`);
    
    if (dependencies.needsNormalizeSize || dependencies.needsTheme) {
      logger.debug('\n💡 Tip: Make sure your project has path aliases configured for @/ imports.');
    }

    return true;
  } catch (error) {
    if (error instanceof TemplateNotFoundError) {
      logger.error(`Component "${componentName}" not found.`);
      logger.warning('Available components:');
      
      const templates = listTemplates(templatesDir);
      
      if (templates.length === 0) {
        logger.gray('  No components available.');
      } else {
        templates.forEach(template => {
          logger.gray(`  - ${template}`);
        });
      }
      throw error;
    }
    throw error;
  }
}

/**
 * Main add command handler
 */
async function handleAdd(name, options = {}) {
  const logger = new Logger({
    verbose: options.verbose || false,
    silent: options.silent || false,
  });
  
  const { getProjectRoot } = require('../utils/pathUtils');
  const projectRoot = getProjectRoot();
  const config = new Config(projectRoot);
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  
  logger.debug(`Project root: ${projectRoot}`);
  logger.debug(`Package dir: ${packageDir}`);

  const kebabName = toKebabCase(name);
  const overwrite = options.overwrite || false;
  
  // Check if it's a component
  const componentPath = path.join(templatesDir, `${kebabName}.tsx`);
  if (fs.existsSync(componentPath)) {
    return await addComponent(name, { logger, config, overwrite });
  }

  // Check if it's a helper
  const helperPath = path.join(templatesDir, 'helpers', `${kebabName}.ts`);
  if (fs.existsSync(helperPath)) {
    return await addHelper(name, { logger, config, overwrite });
  }

  // Check if it's a constant
  const constantPath = path.join(templatesDir, 'constants', `${kebabName}.ts`);
  if (fs.existsSync(constantPath)) {
    return await addConstant(name, { logger, config, overwrite });
  }

  // Not found
  throw new TemplateNotFoundError(name);
}

module.exports = {
  handleAdd,
  addComponent,
  addHelper,
  addConstant,
};

