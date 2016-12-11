'use strict';
// TODO (Ivan): Remove this script when fix is available in React Native
// or we find a better workaround
const fs = require('fs-extra');
const path = require('path');

const sourceFile = path.join('build-script', 'postinstall', 'InitializeCore.js');
//eslint-disable-next-line
const destFile = path.join('node_modules', 'react-native', 'Libraries', 'Core', 'InitializeCore.js');

fs.copySync(sourceFile, destFile);
