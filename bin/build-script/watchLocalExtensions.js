'use-strict';

const path = require('path');
const fsExtra = require('fs-extra');
const watch = require('node-watch');
const getLocalExtensions = require('./getLocalExtensions.js');
const extensionsDir = require('../config.json').extensionsDir;

const localExtensions = getLocalExtensions(extensionsDir);
localExtensions.forEach((extension) => {
  const packageName = extension.type;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);
  console.log(`Watching ${packageName}`);
  watch(packagePath, (filename) => {
    const localPath = filename.split(packageName).pop();
    const destination = path.join(installedExtensionPath, localPath);
    console.log(`Copying ${filename} to ${destination}`);
    fsExtra.copy(filename, destination, (error) => {
      if (error) {
        console.error(error);
      }

      return;
    });
  });
});

process.disconnect();