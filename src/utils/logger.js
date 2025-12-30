const chalk = require('chalk');

class Logger {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.silent = options.silent || false;
  }

  info(message) {
    if (!this.silent) {
      console.log(chalk.blue('ℹ'), message);
    }
  }

  success(message) {
    if (!this.silent) {
      console.log(chalk.green('✓'), message);
    }
  }

  error(message) {
    if (!this.silent) {
      console.error(chalk.red('✖'), message);
    }
  }

  warning(message) {
    if (!this.silent) {
      console.log(chalk.yellow('⚠'), message);
    }
  }

  debug(message) {
    if (this.verbose && !this.silent) {
      console.log(chalk.gray('🔍'), message);
    }
  }

  log(message) {
    if (!this.silent) {
      console.log(message);
    }
  }

  gray(message) {
    if (!this.silent) {
      console.log(chalk.gray(message));
    }
  }
}

module.exports = Logger;
