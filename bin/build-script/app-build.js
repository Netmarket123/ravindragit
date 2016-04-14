'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
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
    return `/v1/apps/${this.appId}/configuration`;
  }

  getAuthorizationToken() {
    // TODO(Ivan): add real jwt token when authorization api available
    return this.jwt;
  }

  downloadConfiguration() {
    console.time('download configuration');
    const configurationFile = fs.createWriteStream(this.configurationFilePath);
    return new Promise((resolve, reject) => {
      let responseSent = false; // flag to make sure that response is sent only once.
      http.get({
        path: this.getConfigurationUrl(),
        host: this.serverApiEndpoint,
        headers: {
          Authorization: this.getAuthorizationToken(),
          Accept: 'application/vnd.api+json',
        },
      }, response => {
        response.pipe(configurationFile);
        configurationFile.on('finish', () => {
          configurationFile.close(() => {
            if (responseSent) return;
            responseSent = true;
            console.timeEnd('download configuration');
            resolve(this.configurationPath);
          });
        });
      }).on('error', err => {
        if (responseSent) return;
        responseSent = true;
        reject(err);
      });
    });
  }

  getConfiguration(assetsPath) {
    return require(path.join('..', assetsPath));
  }

  removeBabelrcFiles() {
    console.time('removing .babelrc files');

    rimraf.sync('./node_modules/*/.babelrc');

    console.timeEnd('removing .babelrc files');
  }

  prepareExtensions() {
    this.configuration = this.getConfiguration(this.configurationFilePath);
    const extensions = getExtensionsFromConfigurations(this.configuration);
    const localExtensions = getLocalExtensions(this.workingDirectories);
    const extensionsJsPath = this.extensionsJsPath;
    const extensionsInstaller = new ExtensionsInstaller(
      localExtensions,
      extensions,
      extensionsJsPath
    );

    return extensionsInstaller.installExtensions()
      .then((installedExtensions) => {
        extensionsInstaller.createExtensionsJs(installedExtensions);
      });
  }

  run() {
    console.time('build time');
    console.log(`starting build for app ${this.appId}`);
    shelljs.exec('npm install');
    // this.downloadConfiguration()
    //   .then(() => this.prepareExtensions())
    this.prepareExtensions()
      .then(() => {
        shelljs.exec('npm install');
        console.timeEnd('build time');
      })
      .then(() => this.removeBabelrcFiles())
      .catch((e) => console.log(e));
  }
}

module.exports = AppBuild;
