#!/usr/bin/env node

/**
 * Expo App UI CLI - Production Ready
 * 
 * A UI component library CLI for Expo React Native
 * Copy components directly into your project and customize them
 */

const { program } = require('commander');
const packageJson = require('../package.json');
const { handleAdd } = require('../src/commands/add');
const { handleList } = require('../src/commands/list');
const { CLIError, TemplateNotFoundError, FileExistsError, InvalidInputError } = require('../src/utils/errors');
const Logger = require('../src/utils/logger');

// Initialize logger
const logger = new Logger({
  verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
  silent: process.argv.includes('--silent') || process.argv.includes('-s'),
});

// CLI setup
program
  .name('expo-app-ui')
  .description('A UI component library for Expo React Native')
  .version(packageJson.version)
  .option('-v, --verbose', 'verbose output')
  .option('-s, --silent', 'silent mode');

// Add command
program
  .option('--overwrite', 'Overwrite existing files')
  .command('add <name>')
  .description('Add a component, helper, or constant to your project')
  .action(async (name) => {
    try {
      await handleAdd(name, {
        overwrite: program.opts().overwrite || false,
        verbose: logger.verbose,
        silent: logger.silent,
      });
    } catch (error) {
      if (error instanceof TemplateNotFoundError) {
        logger.error(`"${name}" not found.`);
        logger.info('Run "npx expo-app-ui list" to see available items.');
      } else if (error instanceof FileExistsError) {
        // User was prompted and chose not to overwrite, or non-interactive mode
        logger.warning(`File already exists: ${error.filePath}`);
        logger.info('Use --overwrite to replace it, or run the command again and choose "y" when prompted.');
      } else if (error instanceof InvalidInputError) {
        logger.error(error.message);
      } else if (error instanceof CLIError) {
        logger.error(error.message);
      } else {
        logger.error(`Unexpected error: ${error.message}`);
        if (logger.verbose) {
          console.error(error.stack);
        }
      }
      process.exit(1);
    }
  });

// List command
program
  .command('list')
  .description('List all available components, helpers, and constants')
  .action(() => {
    try {
      handleList({
        verbose: logger.verbose,
        silent: logger.silent,
      });
    } catch (error) {
      logger.error(`Error: ${error.message}`);
      if (logger.verbose) {
        console.error(error);
      }
      process.exit(1);
    }
  });

// Global error handler
process.on('unhandledRejection', (error) => {
  logger.error(`Unhandled error: ${error.message}`);
  if (logger.verbose) {
    console.error(error);
  }
  process.exit(1);
});

// Parse arguments
program.parse();
