'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
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

  getLocalExtensions(extensionsDir) {
    const results = [];
    console.time('load local extensions');
    fs.readdirSync(extensionsDir).forEach((file) => {
      const extensionPath = path.join(extensionsDir, file);
      const stat = fs.statSync(extensionPath);

      if (stat && stat.isDirectory()) {
        results.push({
          type: file,
          path: extensionPath,
        });
      }
    });
    console.timeEnd('load local extensions');
    return results;
  }

  prepareExtensions() {
    this.configuration = this.getConfiguration(this.configurationFilePath);
    console.log('configuracija');
    const extensions = this.configuration.extensions;
    const localExtensions = this.getLocalExtensions(this.extensionsDir);
    console.log('loc ext');
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
