const path = require('path');
const fs = require('fs-extra');
const { getPackageDir } = require('../utils/pathUtils');
const { listTemplates } = require('../core/templateProcessor');
const Logger = require('../utils/logger');

/**
 * List all available items
 */
function handleList(options = {}) {
  const logger = new Logger({
    verbose: options.verbose || false,
    silent: options.silent || false,
  });

  try {
    const packageDir = getPackageDir();
    const templatesDir = path.join(packageDir, 'templates');
    
    const items = {
      components: [],
      helpers: [],
      constants: [],
      contexts: [],
    };

    // List components (from components/ui/)
    const componentsDir = path.join(templatesDir, 'components', 'ui');
    if (fs.existsSync(componentsDir)) {
      items.components = listTemplates(componentsDir);
    }

    // List helpers
    const helpersDir = path.join(templatesDir, 'helpers');
    if (fs.existsSync(helpersDir)) {
      items.helpers = listTemplates(helpersDir);
    }

    // List constants
    const constantsDir = path.join(templatesDir, 'constants');
    if (fs.existsSync(constantsDir)) {
      items.constants = listTemplates(constantsDir);
    }

    // List contexts
    const contextsDir = path.join(templatesDir, 'context');
    if (fs.existsSync(contextsDir)) {
      items.contexts = listTemplates(contextsDir);
    }

    if (items.components.length === 0 && items.helpers.length === 0 && items.constants.length === 0 && items.contexts.length === 0) {
      logger.warning('No items available.');
      return;
    }

    const chalk = require('chalk');
    
    if (items.components.length > 0) {
      console.log(chalk.blue('Available components:\n'));
      items.components.forEach(item => {
        logger.gray(`  - ${item}`);
      });
      console.log();
    }

    if (items.helpers.length > 0) {
      console.log(chalk.blue('Available helpers:\n'));
      items.helpers.forEach(item => {
        logger.gray(`  - ${item}`);
      });
      console.log();
    }

    if (items.constants.length > 0) {
      console.log(chalk.blue('Available constants:\n'));
      items.constants.forEach(item => {
        logger.gray(`  - ${item}`);
      });
      console.log();
    }

    if (items.contexts.length > 0) {
      console.log(chalk.blue('Available contexts:\n'));
      items.contexts.forEach(item => {
        logger.gray(`  - ${item}`);
      });
    }
  } catch (error) {
    logger.error(`Error listing items: ${error.message}`);
    if (logger.verbose) {
      console.error(error);
    }
    throw error;
  }
}

module.exports = {
  handleList,
};

