'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const getLocalExtensions = require('./getLocalExtensions');
const ExtensionsInstaller = require('./extensions-installer.js');

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
    // TODO(Ivan): change this with /apps/1/assets/app/configuration when api will be available
    return '';
  }

  downloadConfiguration() {
    console.time('download configuration');
    const configurationFile = fs.createWriteStream(this.configurationFilePath);
    return new Promise((resolve, reject) => {
      let responseSent = false; // flag to make sure that response is sent only once.
      http.get(this.getConfigurationUrl(), response => {
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

  prepareExtensions() {
    this.configuration = this.getConfiguration(this.configurationFilePath);
    const extensions = this.configuration.extensions;
    const localExtensions = getLocalExtensions(this.extensionsDir);
    const extensionsJsPath = this.extensionsJsPath;
    const extensionsInstaller = new ExtensionsInstaller(
      localExtensions,
      extensions,
      extensionsJsPath
     );
    extensionsInstaller.installExtensions();
    return extensionsInstaller.createExtensionsJs();
  }

  run() {
    console.log(`starting build for app ${this.appId}`);
    // TO DO(Ivan) add this.downloadConfiguration() as first step when
    // configuration api is available
    this.prepareExtensions()
    .then(() => console.log('build finished'))
    .catch((e) => console.log(e));
  }
}

module.exports = AppBuild;
