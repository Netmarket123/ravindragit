'use strict';

const path = require('path');
const http = require('https');
const npm = require('npm/lib/npm.js');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const unzip = require('unzip');
const getLocalExtensions = require('./getLocalExtensions');
const _ = require('lodash');
const shoutemDependencies = require('../package.json').dependencies;

const dependenciesSet = new Set();

function getDependencyDescriptor(packageName, version) {
  return `${packageName}@${version}`;
}

function addDependenciesToSet(dependencies, set) {
  _.forEach(dependencies, (version, name) => {
    set.add(getDependencyDescriptor(name, version));
  });
}

function deleteDependenciesFromSet(dependencies, set) {
  _.forEach(dependencies, (version, name) => {
    set.delete(getDependencyDescriptor(name, version));
  });
}

function installLocalExtension(extension, clearAfterInstall) {
  if (!extension) return Promise.resolve();
  const packageName = extension.id;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);

  addDependenciesToSet(extension.dependencies, dependenciesSet);
  console.log(`Installing ${packageName}`);
  return new Promise((resolve) => {
    fs.copy(packagePath, installedExtensionPath, () => {
      rimraf(path.join(installedExtensionPath, nodeModules), () => {
        rimraf(path.join(installedExtensionPath, '.git'), () => {
          console.log(`${packageName} installed`);
          if (clearAfterInstall) {
            rimraf(packagePath, () => console.log(`delete ${packagePath}`));
          }
          resolve(extension);
        });
      });
    });
  });
}

function appendZipExtensionTo(filePath) {
  return `${filePath}.zip`;
}

function downloadZipExtension(extension, destinationFolder) {
  const extensionPath = path.join(destinationFolder, extension.id);
  const extensionWriteStream = fs.createWriteStream(appendZipExtensionTo(extensionPath));
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
    downloadZipExtension(extension, './temp')
      .then((extensionPath) => {
        const readStream = fs.createReadStream(appendZipExtensionTo(extensionPath));
        readStream.pipe(
          unzip.Extract({ path: extensionPath }) // eslint-disable-line new-cap
            .on('close', () => {
              readStream.close();
              rimraf(appendZipExtensionTo(extensionPath), () => {
                console.log(`delete zip: ${appendZipExtensionTo(extensionPath)}`);
              });
              const zipExtension = getLocalExtensions([extensionPath])[0];
              resolve(zipExtension);
            })
        );
      });
  });
}

function npmInstall(packageName) {
  console.log(`Installing ${packageName}`);
  return new Promise((resolve, reject) => {
    npm.commands.install([`${packageName}`], (error) => {
      if (error) {
        reject(error);
      }
      console.log(`${packageName} installed`);
      resolve();
    });
  });
}

function installNpmExtension(extension) {
  return new Promise((resolve) => {
    npmInstall(extension.id).then(() => {
      resolve(extension);
    });
  });
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
      this.extensionsToInstall = extensions.filter((extension) =>
        _.get(extension, 'attributes.location.app.type') &&
        (!localExtensions.some(localExtension => localExtension.id === extension.id) ||
        localExtensions.length <= 0)
      );
    }
  }

  installExtensions(productionEnv) {
    return new Promise((resolve) => {
      npm.load({
        'production': productionEnv, // eslint-disable-line quote-props
        'cache-min': 999999,
      }, () => {
        const localExtensionsInstallPromises = this.localExtensions.map((extension) =>
          installLocalExtension(extension)
        );
        const remoteExtensionsInstallPromises = this.extensionsToInstall.map((extension) => {
          const extensionType = _.get(extension, 'attributes.location.app.type');
          return extensionInstaller[extensionType](extension);
        });

        deleteDependenciesFromSet(shoutemDependencies, dependenciesSet);
        const dependenciesArray = [...dependenciesSet];
        console.log('Installing dependencies');
        const dependenciesInstallPromise = npmInstall(dependenciesArray.join(' '));

        const installPromises = [
          ...localExtensionsInstallPromises,
          ...remoteExtensionsInstallPromises,
          dependenciesInstallPromise,
        ];
        return resolve(Promise.all(installPromises));
      });
    });
  }

  createExtensionsJs(installedExtensions) {
    const extensionsMapping = [];

    installedExtensions.forEach((extension) => {
      if (extension) {
        extensionsMapping.push(`'${extension.id}': require('${extension.id}')`);
      }
    });

    const extensionsString = extensionsMapping.join(',\n  ');
    const data = `export default {\n  ${extensionsString},\n};`;

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
