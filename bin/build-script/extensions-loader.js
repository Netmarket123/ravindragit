'use strict';

const shelljs = require('shelljs');
const fs = require('fs');

class ExtensionsLoader {
  constructor(localExtensions, extensions, extensionsJsPath) {
    this.localExtensions = localExtensions;
    this.extensionsJsPath = extensionsJsPath;
    this.extensionsToInstall = [];

    extensions.forEach((extension) => {
      let notAvailableLocally = localExtensions.some((localExtension) => {
        localExtension.type !== extension.type
      });

      if(notAvailableLocally) {
        this.extensionsToInstall.push(extension);
      }
    });
  }

  installExtensions() {
    this.localExtensions.forEach((extension) => {
      console.log(`linking ${extension.type}`);
      shelljs.exec(`npm link ${extension.path}`);
    });

    this.extensionsToInstall.forEach((extension) => {
      console.log(`installing ${extension.type}`);
      shelljs.exec(`npm link ${extension.type}`);
    });
  }

  createExtensionsJs() {
    let extensions = this.localExtensions.concat(this.extensionsToInstall);
    let extensionsMapping = [];

    extensions.forEach((extension) => {
      extensionsMapping.push(`'${extension.type}' : require('${extension.type}')`);
    });

    let extensionsString = extensionsMapping.join(',\n\t');
    let data = `export const extensions = {\n\t${extensionsString}\n}`;

    console.time('create extensions.js');
    return new Promise((resolve, reject) => {
      fs.writeFile(this.extensionsJsPath, data, (error) => {
        if (error) {
          reject(error);
        }

        console.timeEnd('create extensions.js');
        resolve();
      });
    });
  }
}

module.exports = ExtensionsLoader;
