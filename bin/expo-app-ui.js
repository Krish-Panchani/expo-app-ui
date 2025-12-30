#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');

// Get the directory where this package is installed
const getPackageDir = () => {
  let currentDir = __dirname;
  
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkg = fs.readJsonSync(packageJsonPath);
      if (pkg.bin && (pkg.bin['expo-app-ui'] || pkg.name === 'expo-app-ui')) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  return path.dirname(__dirname);
};

const packageDir = getPackageDir();
const templatesDir = path.join(packageDir, 'templates');

// Get the current working directory (user's project)
const getProjectRoot = () => {
  let currentDir = process.cwd();
  
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json')) || 
        fs.existsSync(path.join(currentDir, 'app.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  return process.cwd();
};

const projectRoot = getProjectRoot();

// Function to convert component name to file name
const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

// Function to convert kebab-case to PascalCase
const toPascalCase = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Detect dependencies in component content
const detectDependencies = (content) => {
  const dependencies = {
    needsNormalizeSize: false,
    needsTheme: false,
  };

  if (content.includes('@/helper/normalizeSize') || content.includes('normalizeSize')) {
    dependencies.needsNormalizeSize = true;
  }

  if (content.includes('@/constants/theme') || content.includes('from "@/constants/theme"')) {
    dependencies.needsTheme = true;
  }

  return dependencies;
};

// Add helper file
async function addHelper(helperName, options = {}) {
  const kebabName = toKebabCase(helperName);
  const templatePath = path.join(templatesDir, 'helpers', `${kebabName}.ts`);
  const helpersDir = path.join(projectRoot, 'helpers');
  const targetPath = path.join(helpersDir, `${kebabName}.ts`);

  try {
    if (!fs.existsSync(templatePath)) {
      console.error(chalk.red(`✖ Helper "${helperName}" not found.`));
      
      // List available helpers
      const helpersTemplateDir = path.join(templatesDir, 'helpers');
      if (fs.existsSync(helpersTemplateDir)) {
        const helpers = fs.readdirSync(helpersTemplateDir)
          .filter(file => file.endsWith('.ts') || file.endsWith('.tsx'))
          .map(file => path.basename(file, path.extname(file)));
        
        if (helpers.length > 0) {
          console.log(chalk.yellow('\nAvailable helpers:'));
          helpers.forEach(helper => {
            console.log(chalk.gray(`  - ${helper}`));
          });
        }
      }
      
      process.exit(1);
    }

    await fs.ensureDir(helpersDir);

    const overwrite = process.argv.includes('--overwrite') || options.overwrite;
    
    if (fs.existsSync(targetPath) && !overwrite) {
      console.error(chalk.red(`✖ Helper "${helperName}" already exists at ${targetPath}`));
      console.log(chalk.yellow('  Use --overwrite to replace it.'));
      process.exit(1);
    }

    let content = await fs.readFile(templatePath, 'utf-8');
    await fs.writeFile(targetPath, content, 'utf-8');

    if (!options.silent) {
      console.log(chalk.green(`✓ Added ${helperName} helper to ${path.relative(projectRoot, targetPath)}`));
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red(`✖ Error adding helper: ${error.message}`));
    process.exit(1);
  }
}

// Add constants file
async function addConstant(constantName, options = {}) {
  const kebabName = toKebabCase(constantName);
  const templatePath = path.join(templatesDir, 'constants', `${kebabName}.ts`);
  const constantsDir = path.join(projectRoot, 'constants');
  const targetPath = path.join(constantsDir, `${kebabName}.ts`);

  try {
    if (!fs.existsSync(templatePath)) {
      console.error(chalk.red(`✖ Constant "${constantName}" not found.`));
      
      // List available constants
      const constantsTemplateDir = path.join(templatesDir, 'constants');
      if (fs.existsSync(constantsTemplateDir)) {
        const constants = fs.readdirSync(constantsTemplateDir)
          .filter(file => file.endsWith('.ts') || file.endsWith('.tsx'))
          .map(file => path.basename(file, path.extname(file)));
        
        if (constants.length > 0) {
          console.log(chalk.yellow('\nAvailable constants:'));
          constants.forEach(constant => {
            console.log(chalk.gray(`  - ${constant}`));
          });
        }
      }
      
      process.exit(1);
    }

    await fs.ensureDir(constantsDir);

    const overwrite = process.argv.includes('--overwrite') || options.overwrite;
    
    if (fs.existsSync(targetPath) && !overwrite) {
      console.error(chalk.red(`✖ Constant "${constantName}" already exists at ${targetPath}`));
      console.log(chalk.yellow('  Use --overwrite to replace it.'));
      process.exit(1);
    }

    let content = await fs.readFile(templatePath, 'utf-8');
    
    // Auto-add normalizeSize dependency for theme.ts
    if (kebabName === 'theme') {
      const normalizeSizePath = path.join(projectRoot, 'helpers', 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        if (!options.silent) {
          console.log(chalk.blue('ℹ Adding normalizeSize helper (required dependency for theme)...'));
        }
        await addHelper('normalizeSize', { silent: true, overwrite: false });
      }
      
      // Fix import path to use relative path
      const normalizeSizeExists = fs.existsSync(normalizeSizePath);
      if (normalizeSizeExists) {
        // The import in theme.ts already uses '../helpers/normalizeSize' which is correct
        // No need to change it
      }
    }

    await fs.writeFile(targetPath, content, 'utf-8');

    if (!options.silent) {
      console.log(chalk.green(`✓ Added ${constantName} constant to ${path.relative(projectRoot, targetPath)}`));
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red(`✖ Error adding constant: ${error.message}`));
    process.exit(1);
  }
}

// Function to add a component
async function addComponent(componentName) {
  const kebabName = toKebabCase(componentName);
  const templatePath = path.join(templatesDir, `${kebabName}.tsx`);
  const componentsDir = path.join(projectRoot, 'components', 'ui');
  const targetPath = path.join(componentsDir, `${toPascalCase(kebabName)}.tsx`);

  try {
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      console.error(chalk.red(`✖ Component "${componentName}" not found.`));
      console.log(chalk.yellow(`Available components:`));
      
      // List available components
      const templates = fs.readdirSync(templatesDir)
        .filter(file => (file.endsWith('.tsx') || file.endsWith('.ts')) && 
               !fs.statSync(path.join(templatesDir, file)).isDirectory())
        .map(file => path.basename(file, path.extname(file)));
      
      if (templates.length === 0) {
        console.log(chalk.gray('  No components available.'));
      } else {
        templates.forEach(template => {
          console.log(chalk.gray(`  - ${template}`));
        });
      }
      process.exit(1);
    }

    // Ensure components/ui directory exists
    await fs.ensureDir(componentsDir);

    // Get overwrite option from command
    const overwrite = process.argv.includes('--overwrite');
    
    // Check if component already exists
    if (fs.existsSync(targetPath) && !overwrite) {
      console.error(chalk.red(`✖ Component "${componentName}" already exists at ${targetPath}`));
      console.log(chalk.yellow('  Use --overwrite to replace it.'));
      process.exit(1);
    }

    // Read template content
    let content = await fs.readFile(templatePath, 'utf-8');
    
    // Detect dependencies
    const dependencies = detectDependencies(content);
    
    // Auto-add dependencies if needed
    const dependenciesToAdd = [];
    
    if (dependencies.needsNormalizeSize) {
      const normalizeSizePath = path.join(projectRoot, 'helpers', 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        dependenciesToAdd.push('normalizeSize helper');
      }
    }

    if (dependencies.needsTheme) {
      const themePath = path.join(projectRoot, 'constants', 'theme.ts');
      if (!fs.existsSync(themePath)) {
        dependenciesToAdd.push('theme constants');
      }
    }

    // Show summary of what will be added
    if (dependenciesToAdd.length > 0) {
      console.log(chalk.blue(`\nℹ Detected dependencies: ${dependenciesToAdd.join(', ')}`));
      console.log(chalk.gray('  Adding required dependencies...\n'));
    }

    // Add dependencies
    if (dependencies.needsNormalizeSize) {
      const normalizeSizePath = path.join(projectRoot, 'helpers', 'normalizeSize.ts');
      if (!fs.existsSync(normalizeSizePath)) {
        await addHelper('normalizeSize', { silent: true });
      }
    }

    if (dependencies.needsTheme) {
      const themePath = path.join(projectRoot, 'constants', 'theme.ts');
      if (!fs.existsSync(themePath)) {
        await addConstant('theme', { silent: true });
      }
    }

    // Fix relative imports (e.g., CustomText from "./CustomText")
    // This will be handled by the user's path aliases, so we keep @/ imports

    // Write to target location
    await fs.writeFile(targetPath, content, 'utf-8');

    console.log(chalk.green(`✓ Added ${componentName} component to ${path.relative(projectRoot, targetPath)}`));
    
    if (dependencies.needsNormalizeSize || dependencies.needsTheme) {
      console.log(chalk.gray('\n💡 Tip: Make sure your project has path aliases configured for @/ imports.'));
    }

  } catch (error) {
    console.error(chalk.red(`✖ Error adding component: ${error.message}`));
    process.exit(1);
  }
}

// Function to list available items
function listItems() {
  try {
    const items = {
      components: [],
      helpers: [],
      constants: [],
    };

    // List components
    if (fs.existsSync(templatesDir)) {
      const files = fs.readdirSync(templatesDir);
      files.forEach(file => {
        const filePath = path.join(templatesDir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
          items.components.push(path.basename(file, path.extname(file)));
        }
      });
    }

    // List helpers
    const helpersDir = path.join(templatesDir, 'helpers');
    if (fs.existsSync(helpersDir)) {
      const files = fs.readdirSync(helpersDir);
      files.forEach(file => {
        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          items.helpers.push(path.basename(file, path.extname(file)));
        }
      });
    }

    // List constants
    const constantsDir = path.join(templatesDir, 'constants');
    if (fs.existsSync(constantsDir)) {
      const files = fs.readdirSync(constantsDir);
      files.forEach(file => {
        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          items.constants.push(path.basename(file, path.extname(file)));
        }
      });
    }

    if (items.components.length === 0 && items.helpers.length === 0 && items.constants.length === 0) {
      console.log(chalk.yellow('No items available.'));
      return;
    }

    if (items.components.length > 0) {
      console.log(chalk.blue('Available components:\n'));
      items.components.forEach(item => {
        console.log(chalk.gray(`  - ${item}`));
      });
      console.log();
    }

    if (items.helpers.length > 0) {
      console.log(chalk.blue('Available helpers:\n'));
      items.helpers.forEach(item => {
        console.log(chalk.gray(`  - ${item}`));
      });
      console.log();
    }

    if (items.constants.length > 0) {
      console.log(chalk.blue('Available constants:\n'));
      items.constants.forEach(item => {
        console.log(chalk.gray(`  - ${item}`));
      });
    }
  } catch (error) {
    console.error(chalk.red(`✖ Error listing items: ${error.message}`));
    process.exit(1);
  }
}

// CLI setup
program
  .name('expo-ui')
  .description('A UI component library for Expo React Native')
  .version('1.0.0');

program
  .option('--overwrite', 'Overwrite existing files')
  .command('add <name>')
  .description('Add a component, helper, or constant to your project')
  .action(async (name) => {
    // Determine type by checking templates
    const kebabName = toKebabCase(name);
    
    // Check if it's a component
    const componentPath = path.join(templatesDir, `${kebabName}.tsx`);
    if (fs.existsSync(componentPath)) {
      await addComponent(name);
      return;
    }

    // Check if it's a helper
    const helperPath = path.join(templatesDir, 'helpers', `${kebabName}.ts`);
    if (fs.existsSync(helperPath)) {
      await addHelper(name);
      return;
    }

    // Check if it's a constant
    const constantPath = path.join(templatesDir, 'constants', `${kebabName}.ts`);
    if (fs.existsSync(constantPath)) {
      await addConstant(name);
      return;
    }

    // Not found
    console.error(chalk.red(`✖ "${name}" not found.`));
    console.log(chalk.yellow('Run "npx expo-app-ui list" to see available items.'));
    process.exit(1);
  });

program
  .command('list')
  .description('List all available components, helpers, and constants')
  .action(listItems);

program.parse();
