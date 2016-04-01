'use strict';

const path = require('path');
const http = require('https');
const shelljs = require('shelljs');
const fs = require('fs');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;
const unzip = require('unzip2');
const getLocalExtensions = require('./getLocalExtensions');
const _ = require('lodash');

function installLocalExtension(extension, clearAfterInstall) {
  const packageName = extension.id;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);
  console.log(`Installing ${packageName}`);
  shelljs.exec(`npm install ${packagePath}`);
  rimraf(path.join(installedExtensionPath, nodeModules), () => {
    console.log(`${packageName} installed`);
    if (clearAfterInstall) {
      rimraf(packagePath, () => console.log(`delete ${packagePath}`));
    }
  });
  return Promise.resolve(extension);
}

function downloadZipExtension(extension, destinationFolder) {
  const extensionPath = path.join(destinationFolder, extension.id);
  const extensionWriteStream = fs.createWriteStream(extensionPath + '.zip');
  const extensionZipUrl = _.get(extension, 'attributes.location.app.package');
  return new Promise((resolve, reject) => {
    http.get(extensionZipUrl, response => {
      response.pipe(extensionWriteStream);
      extensionWriteStream.on('finish', () => {
        extensionWriteStream.close(() => resolve(extensionPath));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

function getUnzippedExtension(extension) {
  return new Promise(resolve => {
    downloadZipExtension(extension, '../extensions/')
      .then((extensionPath) => {
        const readStream = fs.createReadStream(extensionPath + '.zip');
        readStream.pipe(
          unzip.Extract({ path: extensionPath })
            .on('close', () => {
              readStream.close();
              rimraf(extensionPath + '.zip', () => console.log('delete zip'));
              const zipExtension = getLocalExtensions([extensionPath])[0];
              resolve(zipExtension);
            })
        );
      });
  });
}

function installNpmExtension(extension) {
  console.log(`installing ${extension.id}`);
  shelljs.exec(`npm install ${extension.id}`);
  return Promise.resolve(extension);
}

function installZipExtension(extension) {
  return getUnzippedExtension(extension)
    .then((zipExtension) => installLocalExtension(zipExtension, 'clearAfterInstall'));
}

const extensionInstaller = {
  zip: installZipExtension,
  npm: installNpmExtension,
};


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
          localExtension.id !== extension.id
        ) || localExtensions.length <= 0;

        if (notAvailableLocally) {
          this.extensionsToInstall.push(extension);
        }
      });
    }
  }

  installExtensions() {
    const installPromises = [];
    this.localExtensions.forEach((extension) => {
      installPromises.push(installLocalExtension(extension));
    });

    this.extensionsToInstall.forEach((extension) => {
      const extensionType = _.get(extension, 'attributes.location.app.type');
      installPromises.push(extensionInstaller[extensionType](extension));
    });

    return Promise.all(installPromises);
  }

  createExtensionsJs(installedExtensions) {
    const extensionsMapping = [];

    installedExtensions.forEach((extension) => {
      extensionsMapping.push(`'${extension.id}' : require('${extension.id}')`);
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
