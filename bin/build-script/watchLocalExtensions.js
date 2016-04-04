'use-strict';

const path = require('path');
const fsExtra = require('fs-extra');
const watch = require('node-watch');
const getLocalExtensions = require('./getLocalExtensions.js');
const config = require('../config.json');

const localExtensions = getLocalExtensions(config.workingDirectories);
localExtensions.forEach((extension) => {
  const packageName = extension.id;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);
  console.log(`Watching ${packageName}`);
  watch(packagePath, (filename) => {
    const localPath = filename.split(packagePath).pop();
    const destination = path.join(installedExtensionPath, localPath);
    if (filename !== nodeModules) {
      console.log(`Copying ${filename} to ${destination}`);
      fsExtra.copy(filename, destination, (error) => {
        if (error) {
          console.error(error);
        }

        return;
      });
    }
  });
});
