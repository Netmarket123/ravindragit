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
    Object.assign(this, config);
  }

  getConfigurationUrl() {
    return `/v1/apps/${this.appId}/configurations/current`;
  }

  downloadConfiguration() {
    console.time('download configuration');
    const configurationFolder = path.dirname(this.configurationFilePath);
    fs.mkdirsSync(configurationFolder);

    const configurationFile = fs.createWriteStream(this.configurationFilePath);
    return new Promise((resolve, reject) => {
      http.get({
        path: this.getConfigurationUrl(),
        host: this.serverApiEndpoint,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
        },
      }, response => {
        if (response.statusCode === 200) {
          response.pipe(configurationFile);
          configurationFile.on('finish', () => {
            configurationFile.close(() => {
              console.timeEnd('download configuration');
              resolve(this.configurationPath);
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
    return require(path.join('..', this.configurationFilePath));
  }

  removeBabelrcFiles() {
    console.time('removing .babelrc files');

    rimraf.sync(path.join('.', '/node_modules/', '*/', '.babelrc'));

    console.timeEnd('removing .babelrc files');
  }

  prepareExtensions() {
    this.configuration = this.getConfiguration();
    const extensions = getExtensionsFromConfigurations(this.configuration);
    const localExtensions = getLocalExtensions(this.workingDirectories);
    const extensionsJsPath = this.extensionsJsPath;
    const extensionsInstaller = new ExtensionsInstaller(
      localExtensions,
      extensions,
      extensionsJsPath
    );

    return extensionsInstaller.installExtensions(this.production)
      .then((installedExtensions) => {
        extensionsInstaller.createExtensionsJs(installedExtensions);
      });
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
    console.log(`starting build for app ${this.appId}`);
    this.prepareConfiguration()
      .then(() => this.prepareExtensions())
      .then(() => this.removeBabelrcFiles())
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
