/* eslint global-require: "off" */
/* global require needs to be enabled because files to be required are
 * determined dynamically
*/

'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const rimraf = require('rimraf');
const process = require('process');
const request = require('request');


const getLocalExtensions = require('./getLocalExtensions');
const ExtensionsInstaller = require('./extensions-installer.js');
const buildApiEndpoint = require('./buildApiEndpoint');

const AppRelease = require('./app-release');

function getExtensionsFromConfiguration(configuration) {
  const includedObjects = _.get(configuration, 'included', []);
  return _.filter(includedObjects, { type: 'shoutem.core.extensions' });
}

function getExtensionLocations(extensions) {
  return _.map(extensions, (extension) => _.get(extension, 'attributes.location.app.package'));
}

/**
 * AppBuild builds application by running build steps
 * @param  {Object} config
 *  {
 *      @key Number appId
 *      @key String serverApiEndpoint
 *      @key boolean debug builds debug build
 *      @key String configurationFilePath path to where app configuration should be saved
 *      @key String extensionsDir local extensions directory
 *      @key String extensionsJsPath path to extension.js
 *  }
 */
class AppBuild {
  constructor(config) {
    this.buildConfig = _.assign({ cacheFolder: 'cache' }, config);
    this.setupCaching();
  }

  setupCaching() {
    fs.ensureDirSync(this.buildConfig.cacheFolder);
    fs.ensureFileSync(this.getCachedConfigurationPath());
  }

  isBuildingBaseApp() {
    const baseAppId = this.buildConfig.baseAppId;
    const appId = this.buildConfig.appId;
    return baseAppId === appId;
  }

  shouldUseCachedBundle() {
    const extensions = getExtensionsFromConfiguration(this.configuration);
    const cachedConfigurationPath = this.getCachedConfigurationPath();
    const cachedConfiguration = fs.readJsonSync(cachedConfigurationPath, { throws: false });
    const cachedExtensions = getExtensionsFromConfiguration(cachedConfiguration);
    let cachedBundleExists;

    if (this.isBuildingBaseApp()) {
      try {
        cachedBundleExists = fs.statSync(this.getCachedBundlePath()).isFile();
      } catch (err) {
        cachedBundleExists = false;
      }
    }

    return _.isEqual(getExtensionLocations(extensions), getExtensionLocations(cachedExtensions)) &&
      !cachedBundleExists && this.buildConfig.cacheBaseApp;
  }

  getConfigurationUrl() {
    const serverApiEndpoint = this.buildConfig.serverApiEndpoint;
    const appId = this.buildConfig.appId;
    const production = this.buildConfig.production;
    const path = `configurations/current`;

    return buildApiEndpoint(serverApiEndpoint, appId, path, production);
  }

  downloadConfiguration() {
    console.time('download configuration');
    return new Promise((resolve, reject) => {
      request.get({
        url: this.getConfigurationUrl(),
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }, (error, response, body) => {
        if (response.statusCode === 200) {
          const configuration = JSON.parse(body);
          console.timeEnd('download configuration');
          this.configuration = configuration;
          resolve(configuration);
        } else {
          reject('Configuration download failed!');
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  prepareExtensions() {
    const extensions = getExtensionsFromConfiguration(this.configuration);
    const localExtensions = getLocalExtensions(this.buildConfig.workingDirectories);
    const extensionsJsPath = this.buildConfig.extensionsJsPath;
    const extensionsInstaller = new ExtensionsInstaller(
      localExtensions,
      extensions,
      extensionsJsPath
    );

    return extensionsInstaller.installExtensions(this.buildConfig.production)
      .then((installedExtensions) => {
        const extensionsJs = extensionsInstaller.createExtensionsJs(installedExtensions);
        const preBuild = this.executeBuildLifecycleHook(installedExtensions, 'preBuild');

        return Promise.all([extensionsJs, preBuild]);
      });
  }

  executeBuildLifecycleHook(extensions, lifeCycleStep) {
    console.time(`${lifeCycleStep}`);
    _.forEach(extensions, (extension) => {
      if (extension && extension.id) {
        try {
          const build = require(path.join(extension.id, 'build.js'));
          const buildLifeCycle = _.get(build, lifeCycleStep);
          if (_.isFunction(buildLifeCycle)) {
            const initialWorkingDirectory = process.cwd();
            // run extension build hook in its own folder
            console.time(`[running ${lifeCycleStep}] - ${extension.id}`);
            process.chdir(path.join('node_modules', extension.id));
            buildLifeCycle(this.configuration, this.buildConfig);
            // return to the build script original working directory
            console.timeEnd(`[running ${lifeCycleStep}] - ${extension.id}`);
            process.chdir(initialWorkingDirectory);
          }
        } catch (e) {
          if (e.code !== 'MODULE_NOT_FOUND') {
            console.log(e);
            process.exit(1);
          }
        }
      }
    });
    console.timeEnd(`${lifeCycleStep}`);
    return Promise.resolve();
  }

  removeBabelrcFiles() {
    console.time('removing .babelrc files');

    rimraf.sync(path.join('.', 'node_modules', '*', '.babelrc'));

    console.timeEnd('removing .babelrc files');
    console.log('');
  }

  cleanTempFolder() {
    console.time('cleaning temp files');
    rimraf.sync(path.join('.', 'temp', '*'));
    console.timeEnd('cleaning temp files');
  }

  prepareConfiguration() {
    if (this.buildConfig.offlineMode) {
      const configuration = require(path.resolve(this.buildConfig.configurationFilePath));
      this.configuration = configuration;
      // Nothing to do, resolve to proceed with next build step
      return Promise.resolve(configuration);
    }
    return this.downloadConfiguration();
  }

  buildExtensions() {
    return this.prepareExtensions().then(() => this.removeBabelrcFiles());
  }

  shouldCacheBundle() {
    return this.isBuildingBaseApp() && this.buildConfig.cacheBaseApp;
  }

  cacheBundle(bundlePath) {
    fs.copySync(bundlePath, this.getCachedBundlePath());
    fs.writeJsonSync(this.getCachedConfigurationPath(), this.configuration);
  }

  getCachedConfigurationPath() {
    return path.join(this.buildConfig.cacheFolder, 'configuration.json')
  }

  getCachedBundlePath() {
    return path.join(this.buildConfig.cacheFolder, `${this.buildConfig.baseAppId}.zip`);
  }

  run() {
    console.time('build time');
    console.log(`starting build for app ${this.buildConfig.appId}`);
    // clear any previous build's temp files
    this.cleanTempFolder();
    this.prepareConfiguration()
      .then(() => this.buildExtensions())
      .then(() => {
        console.timeEnd('build time');
        if (this.buildConfig.workingDirectories.length) {
          const runWatchInNewWindow = require('./runWatchInNewWindow.js');
          runWatchInNewWindow();
        }
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  }
}

module.exports = AppBuild;
