const fs = require('fs-extra');
const path = require('path');

const CONFIG_FILE_NAME = '.expo-app-ui.json';
const DEFAULT_CONFIG = {
  componentsDir: 'components/ui',
  helpersDir: 'helpers',
  constantsDir: 'constants',
  pathAlias: '@/',
};

class Config {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, CONFIG_FILE_NAME);
    this.config = { ...DEFAULT_CONFIG };
    this.load();
  }

  load() {
    if (fs.existsSync(this.configPath)) {
      try {
        const userConfig = fs.readJsonSync(this.configPath);
        this.config = { ...DEFAULT_CONFIG, ...userConfig };
      } catch (error) {
        // Invalid config file, use defaults
      }
    }
  }

  save() {
    try {
      fs.writeJsonSync(this.configPath, this.config, { spaces: 2 });
      return true;
    } catch (error) {
      return false;
    }
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    this.save();
  }

  getComponentsDir() {
    return path.join(this.projectRoot, this.config.componentsDir);
  }

  getHelpersDir() {
    return path.join(this.projectRoot, this.config.helpersDir);
  }

  getConstantsDir() {
    return path.join(this.projectRoot, this.config.constantsDir);
  }
}

module.exports = Config;
