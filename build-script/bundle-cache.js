'use strict';
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const getExtensionsFromConfiguration = require('./getExtensionsFromConfiguration');
const getExtensionLocations = require('./getExtensionLocations');

class BundleCache {
  constructor(buildConfig) {
    this.buildConfig = _.assign({ cacheFolder: 'cache' }, buildConfig);
    this.setupCaching();
  }

  setupCaching() {
    fs.ensureDirSync(this.buildConfig.cacheFolder);
    fs.ensureFileSync(this.getCachedConfigurationPath());
  }

  isCachingEnabled() {
    const baseAppId = this.buildConfig.baseAppId;
    const appId = this.buildConfig.appId;
    return baseAppId === appId;
  }

  shouldUseCachedBundle(configuration) {
    const extensions = getExtensionsFromConfiguration(configuration);
    const cachedConfigurationPath = this.getCachedConfigurationPath();
    const cachedConfiguration = fs.readJsonSync(cachedConfigurationPath, { throws: false });
    const cachedExtensions = getExtensionsFromConfiguration(cachedConfiguration);

    return _.isEqual(getExtensionLocations(extensions), getExtensionLocations(cachedExtensions)) &&
       this.buildConfig.cacheBaseApp;
  }

  shouldCacheBundle() {
    return this.isCachingEnabled() && this.buildConfig.cacheBaseApp;
  }

  getCachedBundlePath() {
    return path.join(this.buildConfig.cacheFolder, `${this.buildConfig.baseAppId}.zip`);
  }

  getCachedConfigurationPath() {
    return path.join(this.buildConfig.cacheFolder, 'configuration.json');
  }

  cacheBundle(bundlePath, configuration) {
    fs.copySync(bundlePath, configuration);
    fs.writeJsonSync(this.getCachedConfigurationPath(), configuration);
  }
}

module.exports = BundleCache;
