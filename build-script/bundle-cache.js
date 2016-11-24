'use strict';
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const getExtensionsFromConfiguration = require('./getExtensionsFromConfiguration');
const getExtensionLocations = require('./getExtensionLocations');

class BundleCache {
  constructor(config) {
    this.config = _.assign({ cacheFolder: 'cache' }, config);
    this.setupCaching();
  }

  setupCaching() {
    fs.ensureDirSync(this.config.cacheFolder);
    fs.ensureFileSync(this.getCachedConfigurationPath());
  }

  isCachingEnabled() {
    const baseAppId = this.config.baseAppId;
    const appId = this.config.appId;
    return baseAppId === appId;
  }

  shouldUseCachedBundle(configuration) {
    const extensions = getExtensionsFromConfiguration(configuration);
    const cachedConfigurationPath = this.getCachedConfigurationPath();
    const cachedConfiguration = fs.readJsonSync(cachedConfigurationPath, { throws: false });
    const cachedExtensions = getExtensionsFromConfiguration(cachedConfiguration);

    return _.isEqual(getExtensionLocations(extensions), getExtensionLocations(cachedExtensions)) &&
       this.config.cacheBaseApp;
  }

  shouldCacheBundle() {
    return this.isCachingEnabled() && this.config.cacheBaseApp;
  }

  setConfiguration(configuration) {
    this.configuration = configuration;
  }

  getConfiguration() {
    return this.configuration;
  }

  getCachedBundlePath() {
    return path.join(this.config.cacheFolder, `${this.config.baseAppId}.zip`);
  }

  getCachedConfigurationPath() {
    return path.join(this.config.cacheFolder, 'configuration.json');
  }

  cacheBundle(bundlePath) {
    fs.copySync(bundlePath, this.getCachedBundlePath());
    fs.writeJsonSync(this.getCachedConfigurationPath(), this.getConfiguration());
  }
}

module.exports = BundleCache;
