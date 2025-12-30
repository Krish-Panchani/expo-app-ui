#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');

// Get the directory where this package is installed
const getPackageDir = () => {
  // When installed via npm/npx, __dirname points to node_modules/expo-ui/bin
  // We need to go up to find the package root
  let currentDir = __dirname;
  
  // Try to find package.json in parent directories
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkg = fs.readJsonSync(packageJsonPath);
      // Check if this package has the expo-ai bin command
      if (pkg.bin && (pkg.bin['expo-ai'] || pkg.name === 'expo-ui')) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback: assume we're in development mode
  return path.dirname(__dirname);
};

const packageDir = getPackageDir();
const templatesDir = path.join(packageDir, 'templates');

// Get the current working directory (user's project)
const getProjectRoot = () => {
  let currentDir = process.cwd();
  
  // Look for package.json or app.json (Expo project indicators)
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
const componentsDir = path.join(projectRoot, 'components', 'ui');

// Function to resolve import paths
const resolveImports = (content, componentName) => {
  // Replace @/ imports with relative paths or keep them if user has path aliases configured
  // For now, we'll keep @/ imports as they're commonly used in Expo projects with path aliases
  return content;
};

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

// Function to add a component
async function addComponent(componentName) {
  const kebabName = toKebabCase(componentName);
  const templatePath = path.join(templatesDir, `${kebabName}.tsx`);
  const targetPath = path.join(componentsDir, `${toPascalCase(kebabName)}.tsx`);

  try {
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      console.error(chalk.red(`✖ Component "${componentName}" not found.`));
      console.log(chalk.yellow(`Available components:`));
      
      // List available components
      const templates = fs.readdirSync(templatesDir)
        .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
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
    
    // Resolve imports (if needed)
    content = resolveImports(content, componentName);

    // Write to target location
    await fs.writeFile(targetPath, content, 'utf-8');

    console.log(chalk.green(`✓ Added ${componentName} component to ${path.relative(projectRoot, targetPath)}`));
    
    // Check if components/ui directory needs to be added to gitignore
    const gitignorePath = path.join(projectRoot, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
      if (!gitignoreContent.includes('components/ui')) {
        console.log(chalk.yellow(`\n⚠ Note: You may want to add components/ui to .gitignore if you want to track these files.`));
      }
    }

  } catch (error) {
    console.error(chalk.red(`✖ Error adding component: ${error.message}`));
    process.exit(1);
  }
}

// Function to list available components
function listComponents() {
  try {
    const templates = fs.readdirSync(templatesDir)
      .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
      .map(file => path.basename(file, path.extname(file)));

    if (templates.length === 0) {
      console.log(chalk.yellow('No components available.'));
      return;
    }

    console.log(chalk.blue('Available components:\n'));
    templates.forEach(template => {
      console.log(chalk.gray(`  - ${template}`));
    });
  } catch (error) {
    console.error(chalk.red(`✖ Error listing components: ${error.message}`));
    process.exit(1);
  }
}

// CLI setup
program
  .name('expo-ui')
  .description('A UI component library for Expo React Native')
  .version('1.0.0');

program
  .option('--overwrite', 'Overwrite existing component')
  .command('add <component>')
  .description('Add a component to your project')
  .action(async (component) => {
    await addComponent(component);
  });

program
  .command('list')
  .description('List all available components')
  .action(listComponents);

program.parse();

