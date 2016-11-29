'use-strict';

const path = require('path');
const fs = require('fs-extra');
const watch = require('node-watch');
const globToRegExp = require('glob-to-regexp');
const _ = require('lodash');
const getLocalExtensions = require('./getLocalExtensions.js');
// eslint-disable-next-line import/no-unresolved
const config = require('../config.json');

function concatFileContents(files) {
  let fileContent = '';
  _.forEach(files, file => {
    try {
      fileContent += fs.readFileSync(file, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.log(error);
        process.exit(1);
      }
    }
  });
  return fileContent;
}

function getIgnoreListForPath(folder) {
  const ignoreFile = concatFileContents([
    path.join(folder, '.gitignore'),
    path.join(folder, '.npmignore'),
  ]);
  return _.filter(ignoreFile.split('\n'), (fileName) =>
    !_.startsWith(fileName, '#') && !_.isEmpty(fileName));
}

const localExtensions = getLocalExtensions(config.workingDirectories);
localExtensions.forEach((extension) => {
  const packageName = extension.id;
  const packagePath = extension.path;
  const nodeModules = 'node_modules';
  const ignoreList = getIgnoreListForPath(packagePath);
  const installedExtensionPath = path.join(nodeModules, packageName);
  const shouldCopyFile = (filePath) =>
    _.reduce(ignoreList, (shouldCopy, ignorePath) => {
      if (shouldCopy) {
        return globToRegExp(path.join(packagePath, ignorePath)).test(filePath);
      }

      return false;
    }, true);

  console.time(`Initializing ${packageName}`);
  fs.copySync(packagePath, installedExtensionPath, {
    filter: shouldCopyFile,
    dereference: true,
  });
  console.timeEnd(`Initializing ${packageName}`);

  console.log(`Watching ${packageName}`);
  watch(packagePath, (filename) => {
    const localPath = filename.split(packagePath).pop();
    const destination = path.join(installedExtensionPath, localPath);
    if (shouldCopyFile(filename)) {
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
