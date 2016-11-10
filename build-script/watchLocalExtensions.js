'use-strict';

const path = require('path');
const fs = require('fs-extra');
const watch = require('node-watch');
const getLocalExtensions = require('./getLocalExtensions.js');
// eslint-disable-next-line import/no-unresolved
const config = require('../config.json');

const localExtensions = getLocalExtensions(config.workingDirectories);
localExtensions.forEach((extension) => {
  const packageName = extension.id;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const installedExtensionPath = path.join(nodeModules, packageName);
  const pathsToSkip = /^((?!(node_modules|\.git|\.idea)).)*$/;

  console.time(`Initializing ${packageName}`);
  fs.copySync(packagePath, installedExtensionPath, { filter: pathsToSkip });
  console.timeEnd(`Initializing ${packageName}`);

  console.log(`Watching ${packageName}`);
  watch(packagePath, (filename) => {
    const localPath = filename.split(packagePath).pop();
    const destination = path.join(installedExtensionPath, localPath);
    if (filename.match(pathsToSkip)) {
      console.log(`Copying ${filename} to ${destination}`);
      fs.copy(filename, destination, (error) => {
        if (error) {
          console.error(error);
        }

        return;
      });
    }
  });
});
