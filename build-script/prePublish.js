'use strict';

const _ = require('lodash');
const packageJsonTemplate = require('../package.template.json');
const packageJson = require('../package.json');

if (!_.isEqual(packageJsonTemplate, packageJson)) {
  console.error('package.json should be equal to package.template.json before publish');
  process.exit(1);
}
