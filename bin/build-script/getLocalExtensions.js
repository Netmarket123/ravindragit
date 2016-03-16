'use-strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Gets collection of all local extensions where
 * collection item has {String} name and {String} path keys
 * @param {Array} workingDirectories array of all paths
 * that need to be watched and installed in projects' node_modules folder
 */
function getLocalExtensions(workingDirectories) {
  const results = [];
  console.time('load local extensions');
  [].concat(workingDirectories).forEach((workDirPattern) => {
    const paths = glob.sync(workDirPattern);
    paths.forEach((packagePath) => {
      const stat = fs.statSync(packagePath);

      if (stat && stat.isDirectory()) {
        try {
          const packageJson = path.join(packagePath, 'package.json');
          const packageStat = fs.statSync(packageJson);

          if (packageStat && packageStat.isFile()) {
            const packageName = require(path.join('..', packageJson)).name;
            results.push({
              name: packageName,
              path: packagePath,
            });
          }
        } catch (e) {
          console.log(e);
          console.log(`Skipping ${packagePath}`);
        }
      }
    });
  });
  console.timeEnd('load local extensions');
  return results;
}

module.exports = getLocalExtensions;
