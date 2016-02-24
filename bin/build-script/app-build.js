'use strict';

const https = require('https');
const fs = require('fs');
const unzip = require('unzip');
const ExtensionsLoader = require('./extensions-loader.js');

class AppBuild {
  constructor(config) {
    this.tempPath = 'bundle.zip';
    Object.assign(this, config);
  }

  getBundleUrl() {
    // TODO(Ivan): change this with real bundle api endpoint when it will be available
    return 'https://s3.amazonaws.com/kanta/apps/1027161/990241/bundle_Native_IPhone_RetinaHD_Wide_V43_B961264.zip';
  }

  downloadBundle() {
    console.time('download bundle');
    const zipFile = fs.createWriteStream(this.tempPath);
    return new Promise((resolve, reject) => {
      let responseSent = false; // flag to make sure that response is sent only once.
      https.get(this.getBundleUrl(), response => {
        response.pipe(zipFile);
        zipFile.on('finish', () => {
          zipFile.close(() => {
            if (responseSent) return;
            responseSent = true;
            console.timeEnd('download bundle');
            resolve(this.tempPath);
          });
        });
      }).on('error', err => {
        if (responseSent) return;
        responseSent = true;
        reject(err);
      });
    });
  }

  unzipBundle(zipFilePath, destinationPath) {
    console.time('unzip bundle');
    const zipFile = fs.createReadStream(zipFilePath);
    return new Promise((resolve, reject) => {
      zipFile.pipe(unzip.Extract({ path: destinationPath }));
      zipFile.on('close', () => {
        resolve(destinationPath);
        console.timeEnd('unzip bundle');
      });
    });
  }

  getConfiguration(assetsPath) {
    return require(`.${assetsPath}${this.appExtensionName}/configuration.json`);
  }

  getLocalExtensions(extensionsDir) {
    const results = [];

    console.time('load local extensions');
    fs.readdirSync(extensionsDir).forEach((file) => {
      const extensionPath = `${extensionsDir}/${file}`;
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

  run() {
    console.log(`starting build for app ${this.nid}`);
    this.downloadBundle()
      .then((zipFilePath) => {
        console.log('SUCCESS: bundle downloaded!!');
        return this.unzipBundle(zipFilePath, this.assetsPath);
      })
      .then((assetsPath) => {
        console.log('SUCCESS: bundle unzipped!!');
        this.configuration = this.getConfiguration(assetsPath);
        const extensions = this.configuration.extensions;
        const localExtensions = this.getLocalExtensions(this.extensionsDir);
        const extensionsJsPath = this.extensionsJsPath;
        const extensionsLoader = new ExtensionsLoader(localExtensions, extensions, extensionsJsPath);
        extensionsLoader.installExtensions();
        return extensionsLoader.createExtensionsJs();
      })
      .then(() => {
        console.log('SUCCESS: extensions.js created!!');
        console.log('Build finished!');
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = AppBuild;
