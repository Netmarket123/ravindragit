'use strict';

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const _ = require('lodash');
const glob = require('glob');
const packageJsonTemplate = require('../package.template.json');

function addDependencyToPackageJson(packageJson, name, version) {
  // eslint-disable-next-line no-param-reassign
  packageJson.dependencies[name] = version;
}

function installLocalExtension(extension) {
  if (extension) {
    const packageName = extension.id;
    const packagePath = extension.path;

    addDependencyToPackageJson(packageJsonTemplate, packageName, `file:${packagePath}`);
  }
}

function yarnInstall() {
  console.log('Installing dependencies:');
  console.log(JSON.stringify(packageJsonTemplate.dependencies, null, 2));
  return new Promise((resolve, reject) => {
    shell.exec('yarn install', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function installNpmExtension(extension) {
  // This actually could be any valid npm install argument (version range, GitHub repo,
  // URL to .tgz file or event local path) but for now is always URL to .tgz stored on our server
  const extensionPackageURL = _.get(extension, 'attributes.location.app.package');
  const packageName = extension.id;
  addDependencyToPackageJson(packageJsonTemplate, packageName, extensionPackageURL);
}

function writePackageJson(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile('package.json', JSON.stringify(content, null, 2), (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
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
      this.extensionsToInstall = extensions.filter((extension) =>
        _.get(extension, 'attributes.location.app.type') &&
        (!localExtensions.some(localExtension => localExtension.id === extension.id) ||
        localExtensions.length <= 0)
      );
    }
  }

  installExtensions() {
    this.localExtensions.forEach((extension) =>
      installLocalExtension(extension)
    );

    this.extensionsToInstall.forEach((extension) =>
      installNpmExtension(extension)
    );

    const installedExtensions = [...this.localExtensions, ...this.extensionsToInstall];
    return writePackageJson(packageJsonTemplate)
      .then(() => yarnInstall()
        .then(() => Promise.resolve(installedExtensions))
      );
  }

  createExtensionsJs(installedExtensions) {
    if (_.isEmpty(installedExtensions)) {
      return Promise.reject('[ERROR]: You are trying to build an app without any extensions');
    }

    const extensionsMapping = [];

    installedExtensions.forEach((extension) => {
      if (extension) {
        extensionsMapping.push(`'${extension.id}': require('${extension.id}'),\n  `);
      }
    });

    const extensionsString = extensionsMapping.join('');
    const data = `export default {\n  ${extensionsString}};\n`;

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

  installNativeDependencies(installedExtensions) {
    console.log('Starting pods install');
    console.time('Installing pods');
    const podFileTemplate = fs.readFileSync('ios/Podfile.template', 'utf8', (error) =>
      Promise.reject(error)
    );
    const podspecPaths = _.reduce(installedExtensions, (paths, extension) =>
      paths.concat(glob.sync(`node_modules/${extension.id}/*.podspec`))
    , []);
    const pods = _.map(podspecPaths, (podspecPath) =>
      `pod '${path.basename(podspecPath, '.podspec')}', :path => '../${podspecPaths}'`
    );
    const podFileContent = podFileTemplate.replace(/## <Extension dependencies>/g, pods.join('\n'));
    fs.writeFileSync('ios/Podfile', podFileContent);

    return new Promise((resolve, reject) => {
      shell.exec('cd ios && pod install', (error) => {
        if (error) {
          reject(error);
        } else {
          console.timeEnd('Installing pods');
          resolve();
        }
      });
    });
  }
}

module.exports = ExtensionsInstaller;
