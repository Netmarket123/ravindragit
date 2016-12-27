'use-strict';

const path = require('path');
const fs = require('fs-extra');
const watch = require('node-watch');
const globToRegExp = require('glob-to-regexp');
const parseGitignore = require('parse-gitignore');
const _ = require('lodash');
const getLocalExtensions = require('./getLocalExtensions.js');
// eslint-disable-next-line import/no-unresolved
const config = require('../config.json');

function getIgnoreListForPath(folder) {
  const gitignorePatterns = parseGitignore(path.join(folder, '.gitignore'));
  const npmignorePatterns = parseGitignore(path.join(folder, '.npmignore'));
  return _.union(gitignorePatterns, npmignorePatterns);
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
  fs.move(installedExtensionPath, packageName, { clubber: true }, (error) => {
    console.log(`Watching ${packageName}`);
    if (error) {
      console.error(`Error: ${error} initializing watcher for package ${packageName}`);
      process.exit(1);
    }
    watch(packagePath, (filename) => {
      const localPath = filename.split(packagePath).pop();
      const destination = path.join(packageName, localPath);
      if (shouldCopyFile(filename)) {
        console.log(`Copying ${filename} to ${destination}`);
        fs.copy(filename, destination, (copyError) => {
          if (copyError) {
            console.error(copyError);
          }
        });
      }
    });
  });
  console.timeEnd(`Initializing ${packageName}`);
});
