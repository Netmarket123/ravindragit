/* eslint global-require: "off" */
/* global requre needs to be enabled because files to be required are
 * determined dynamically
*/

'use strict';

const http = require('http');
const fs = require('fs-extra');
const path = require('path');
const getLocalExtensions = require('./getLocalExtensions');
const rimraf = require('rimraf');
const ExtensionsInstaller = require('./extensions-installer.js');
const _ = require('lodash');

function getExtensionsFromConfigurations(configuration) {
  return _.filter(configuration.included, { type: 'shoutem.core.extensions' });
}

/**
 * AppBuild builds application by running build steps
 * @param  {Object} config
 *  {
 *      @key Number appId
 *      @key String serverApiEndpoint
 *      @key boolean debug builds debug build
 *      @key boolean designMode get designMode app configuration
 *      @key String configurationFilePath path to where app configuration should be saved
 *      @key String extensionsDir local extensions directory
 *      @key String extensionsJsPath path to extension.js
 *  }
 */
class AppBuild {
  constructor(config) {
    this.buildConfig = _.assign({}, config);
  }

  getConfigurationUrl() {
    return `/v1/apps/${this.buildConfig.appId}/configurations/current`;
  }

  downloadConfiguration() {
    console.time('download configuration');
    const configurationFolder = path.dirname(this.buildConfig.configurationFilePath);
    fs.mkdirsSync(configurationFolder);

    const configurationFile = fs.createWriteStream(this.buildConfig.configurationFilePath);
    return new Promise((resolve, reject) => {
      http.get({
        path: this.getConfigurationUrl(),
        host: this.buildConfig.serverApiEndpoint,
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }, response => {
        if (response.statusCode === 200) {
          response.pipe(configurationFile);
          configurationFile.on('finish', () => {
            configurationFile.close(() => {
              console.timeEnd('download configuration');
              resolve();
            });
          });
        } else {
          reject('Configuration download failed!');
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  getConfiguration() {
    return require(path.join('..', this.buildConfig.configurationFilePath));
  }

  removeBabelrcFiles() {
    console.time('removing .babelrc files');

    rimraf.sync(path.join('.', '/node_modules/', '*/', '.babelrc'));

    console.timeEnd('removing .babelrc files');
  }

  prepareExtensions() {
    this.configuration = this.getConfiguration();
    const extensions = getExtensionsFromConfigurations(this.configuration);
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
        const preBuild = this.runPreBuild(installedExtensions);

        return Promise.all([extensionsJs, preBuild]);
      });
  }

  runPreBuild(extensions) {
    _.forEach(extensions, (extension) => {
      try {
        const build = require(path.join(extension.id, 'build.js'));
        const preBuild = build.preBuild;
        if (_.isFunction(preBuild)) {
          preBuild(this.configuration, this.buildConfig);
        }
      } catch(e) {
      }
    });
    return Promise.resolve();
  }

  cleanTempFolder() {
    console.time('cleaning temp files');
    rimraf.sync(path.join('.', 'temp', '*'));
    console.timeEnd('cleaning temp files');
  }

  prepareConfiguration() {
    if (this.offlineMode) {
      // Nothing to do, resolve to proceed with next build step
      return new Promise((resolve) => resolve());
    }
    return this.downloadConfiguration();
  }

  run() {
    console.time('build time');
    console.log(`starting build for app ${this.buildConfig.appId}`);
    this.prepareConfiguration()
      .then(() => this.prepareExtensions())
      .then(() => this.removeBabelrcFiles())
      .then(() => this.cleanTempFolder())
      .then(() => {
        console.timeEnd('build time');
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  }
}

module.exports = AppBuild;
