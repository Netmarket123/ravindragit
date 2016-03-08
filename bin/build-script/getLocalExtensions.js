'use-strict';

const fs = require('fs');
const path = require('path');

function getLocalExtensions(extensionsDir) {
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
  console.timeEnd('load local extensions');
  return results;
};

module.exports = getLocalExtensions;
