'use strict';

const shelljs = require('shelljs');
const fs = require('fs');

/**
 * ExtensionInstaller links all local extensions and installs all other extensions from app
 * configuration. It also builds extension.js file which app uses as depedencies dictionary.
 * @param  Array localExtensions The list of extensions in your local extensions folder
 * @param  Array extensions The list of extensions installed in app
 * @param  String extensionsJsPath path to extension.js file
 */
class ExtensionsInstaller {
  constructor(localExtensions, extensions, extensionsJsPath) {
    this.localExtensions = localExtensions;
    this.extensionsJsPath = extensionsJsPath;
    this.extensionsToInstall = [];

    if (extensions) {
      extensions.forEach((extension) => {
        const notAvailableLocally = localExtensions.some((localExtension) =>
          localExtension.type !== extension.type
        );

        if (notAvailableLocally) {
          this.extensionsToInstall.push(extension);
        }
      });
    }
  }

  installExtensions() {
    this.localExtensions.forEach((extension) => {
      console.log(`linking ${extension.type}`);
      shelljs.exec(`npm link ${extension.path}`);
    });

    this.extensionsToInstall.forEach((extension) => {
      console.log(`installing ${extension.type}`);
      shelljs.exec(`npm install ${extension.type}`);
    });
  }

  createExtensionsJs() {
    const extensions = this.localExtensions.concat(this.extensionsToInstall);
    const extensionsMapping = [];

    extensions.forEach((extension) => {
      extensionsMapping.push(`'${extension.type}' : require('${extension.type}')`);
    });

    const extensionsString = extensionsMapping.join(',\n\t');
    const data = `export default const extensions = {\n\t${extensionsString}\n}`;

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

module.exports = ExtensionsInstaller;
