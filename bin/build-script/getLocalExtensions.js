'use-strict';

const fs = require('fs');
const path = require('path');

function getLocalExtensions(extensionsDir, frameworkDir) {
  const results = [];
  console.time('load local extensions');
  fs.readdirSync(extensionsDir).forEach((file) => {
    const extensionPath = path.join(extensionsDir, file);
    const stat = fs.statSync(extensionPath);

    if (stat && stat.isDirectory()) {
      results.push({
        type: file,
        path: extensionPath,
      });
    }
  });

  if (frameworkDir) {
    results.push({
      type: 'shoutem',
      path: frameworkDir,
    });
  }
  console.timeEnd('load local extensions');
  return results;
}

module.exports = getLocalExtensions;
