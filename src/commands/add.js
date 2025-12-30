const path = require('path');
const fs = require('fs-extra');
const { toKebabCase, toPascalCase, getPackageDir } = require('../utils/pathUtils');
const { TemplateNotFoundError } = require('../utils/errors');
const { readTemplate, writeFile, listTemplates } = require('../core/templateProcessor');
const { detectDependencies, detectRelatedContext, detectRelatedComponent } = require('../core/dependencyDetector');
const Logger = require('../utils/logger');
const Config = require('../utils/config');
const { promptOverwrite } = require('../utils/prompt');

/**
 * Helper to create a file exists handler with prompt
 */
function createFileExistsHandler(options) {
  return async (filePath) => {
    if (options.overwrite) {
      return true; // Already confirmed via --overwrite flag
    }
    // Check if we're in interactive mode (not silent and TTY)
    if (!options.silent && process.stdin.isTTY) {
      return await promptOverwrite(filePath);
    }
    return false; // Non-interactive, don't overwrite
  };
}

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
    const handleFileExists = createFileExistsHandler(options);
    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false,
      handleFileExists
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

    const handleFileExists = createFileExistsHandler(options);
    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false,
      handleFileExists
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
  const templatePath = path.join(templatesDir, 'components', 'ui', `${kebabName}.tsx`);
  const targetPath = path.join(config.getComponentsDir(), `${kebabName}.tsx`);

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

    // Check for related context
    const relatedContext = detectRelatedContext(kebabName, templatesDir);
    if (relatedContext) {
      const contextPath = path.join(projectRoot, 'context', `${relatedContext}.tsx`);
      if (!fs.existsSync(contextPath)) {
        dependenciesToAdd.push(`${relatedContext} context`);
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

    // Add related context if needed
    if (relatedContext) {
      const contextPath = path.join(projectRoot, 'context', `${relatedContext}.tsx`);
      if (!fs.existsSync(contextPath)) {
        await addContext(relatedContext, {
          logger,
          config,
          silent: false,
          overwrite: false,
        });
      }
    }

    const handleFileExists = createFileExistsHandler(options);
    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false,
      handleFileExists
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
      
      const componentsTemplateDir = path.join(templatesDir, 'components', 'ui');
      const templates = listTemplates(componentsTemplateDir);
      
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
 * Add a context file
 */
async function addContext(contextName, options = {}) {
  const logger = options.logger || new Logger();
  const config = options.config;
  const projectRoot = config.projectRoot;
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  
  const kebabName = toKebabCase(contextName);
  const templatePath = path.join(templatesDir, 'context', `${kebabName}.tsx`);
  const contextDir = path.join(projectRoot, 'context');
  const targetPath = path.join(contextDir, `${kebabName}.tsx`);

  try {
    logger.debug(`Looking for template: ${templatePath}`);
    
    const content = await readTemplate(templatePath);
    
    // Detect dependencies including related component
    const dependencies = detectDependencies(content);
    
    // Check for related component
    const relatedComponent = detectRelatedComponent(kebabName, templatesDir);
    const dependenciesToAdd = [];
    
    if (relatedComponent) {
      const componentPath = path.join(config.getComponentsDir(), `${relatedComponent}.tsx`);
      if (!fs.existsSync(componentPath)) {
        dependenciesToAdd.push(`${relatedComponent} component`);
      }
    }

    // Show summary of what will be added
    if (dependenciesToAdd.length > 0) {
      logger.info(`\nDetected dependencies: ${dependenciesToAdd.join(', ')}`);
      logger.debug('Adding required dependencies...\n');
    }

    // Add related component if needed
    if (relatedComponent) {
      const componentPath = path.join(config.getComponentsDir(), `${relatedComponent}.tsx`);
      if (!fs.existsSync(componentPath)) {
        await addComponent(relatedComponent, {
          logger,
          config,
          silent: false,
          overwrite: false,
        });
      }
    }

    const handleFileExists = createFileExistsHandler(options);
    const validatedPath = await writeFile(
      targetPath,
      content,
      projectRoot,
      options.overwrite || false,
      handleFileExists
    );

    if (!options.silent) {
      logger.success(`Added ${contextName} context to ${path.relative(projectRoot, validatedPath)}`);
    }
    
    return true;
  } catch (error) {
    if (error instanceof TemplateNotFoundError) {
      logger.error(`Context "${contextName}" not found.`);
      throw error;
    }
    throw error;
  }
}

/**
 * Add top loading bar (context + component combo)
 */
async function addTopLoadingBar(options = {}) {
  const logger = options.logger || new Logger();
  const config = options.config;
  const projectRoot = config.projectRoot;
  const packageDir = getPackageDir();
  const templatesDir = path.join(packageDir, 'templates');
  const overwrite = options.overwrite || false;
  const handleFileExists = createFileExistsHandler(options);
  
  logger.info('Adding Top Loading Bar (context + component)...\n');
  
  // Add loading-bar component first
  const loadingBarPath = path.join(templatesDir, 'components', 'ui', 'loading-bar.tsx');
  if (fs.existsSync(loadingBarPath)) {
    const componentsDir = config.getComponentsDir();
    const targetComponentPath = path.join(componentsDir, 'loading-bar.tsx');
    
    const content = await readTemplate(loadingBarPath);
    const validatedPath = await writeFile(
      targetComponentPath,
      content,
      projectRoot,
      overwrite,
      handleFileExists
    );
    logger.success(`Added loading-bar component to ${path.relative(projectRoot, validatedPath)}`);
  } else {
    throw new TemplateNotFoundError('loading-bar');
  }
  
  // Add top-loading-bar-context
  const contextPath = path.join(templatesDir, 'context', 'top-loading-bar-context.tsx');
  if (fs.existsSync(contextPath)) {
    const contextDir = path.join(projectRoot, 'context');
    const targetContextPath = path.join(contextDir, 'top-loading-bar-context.tsx');
    
    const content = await readTemplate(contextPath);
    const validatedPath = await writeFile(
      targetContextPath,
      content,
      projectRoot,
      overwrite,
      handleFileExists
    );
    logger.success(`Added top-loading-bar-context to ${path.relative(projectRoot, validatedPath)}`);
  } else {
    throw new TemplateNotFoundError('top-loading-bar-context');
  }
  
  logger.info('\n📝 Next steps:');
  logger.info('1. Wrap your root _layout.tsx with <LoadingProvider>:');
  logger.gray(`
   import { LoadingProvider } from "@/context/top-loading-bar-context";
   
   export default function RootLayout() {
     return (
       <LoadingProvider color="#007AFF">
         {/* Your app content */}
       </LoadingProvider>
     );
   }
  `);
  
  logger.info('2. Use the hook in your components:');
  logger.gray(`
   import { useTopLoadingBar } from "@/context/top-loading-bar-context";
   
   const { showLoading, hideLoading } = useTopLoadingBar();
   
   // Show loading
   showLoading();
   
   // Hide loading
   hideLoading();
  `);
  
  return true;
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
  
  // Special handling for top-loading-bar
  if (kebabName === 'top-loading-bar' || kebabName === 'toploadingbar') {
    return await addTopLoadingBar({ logger, config, overwrite });
  }
  
  // Check if it's a component (look in components/ui/)
  const componentPath = path.join(templatesDir, 'components', 'ui', `${kebabName}.tsx`);
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

  // Check if it's a context (try both kebab-case and PascalCase)
  const contextPathKebab = path.join(templatesDir, 'context', `${kebabName}.tsx`);
  const contextPathPascal = path.join(templatesDir, 'context', `${toPascalCase(kebabName)}.tsx`);
  if (fs.existsSync(contextPathKebab)) {
    return await addContext(name, { logger, config, overwrite });
  } else if (fs.existsSync(contextPathPascal)) {
    // Use the actual file name
    const actualName = path.basename(contextPathPascal, '.tsx');
    return await addContext(actualName, { logger, config, overwrite });
  }

  // Not found
  throw new TemplateNotFoundError(name);
}

module.exports = {
  handleAdd,
  addComponent,
  addHelper,
  addConstant,
  addContext,
  addTopLoadingBar,
};

