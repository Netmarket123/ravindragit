'use strict';

const path = require('path');
const shelljs = require('shelljs');
const fs = require('fs');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;

function installLocalExtension(extension) {
  const packageName = extension.name;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);
  console.log(`Installing ${packageName}`);
  shelljs.exec(`npm install file:${packagePath}`);
  rimraf(path.join(installedExtensionPath, nodeModules), () => {
    console.log(`${packageName} installed`);
  });
}

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
          localExtension.name !== extension.name
        );

        if (notAvailableLocally) {
          this.extensionsToInstall.push(extension);
        }
      });
    }
  }

  installExtensions() {
    this.localExtensions.forEach((extension) => {
      installLocalExtension(extension);
    });

    const child = spawn('node', ['./build-script/watchLocalExtensions'], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();

    this.extensionsToInstall.forEach((extension) => {
      console.log(`installing ${extension.name}`);
      shelljs.exec(`npm install ${extension.name}`);
    });
  }

  createExtensionsJs() {
    const extensions = this.localExtensions.concat(this.extensionsToInstall);
    const extensionsMapping = [];

    extensions.forEach((extension) => {
      extensionsMapping.push(`'${extension.name}' : require('${extension.name}')`);
    });

    const extensionsString = extensionsMapping.join(',\n\t');
    const data = `export default {\n\t${extensionsString}\n}`;

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
