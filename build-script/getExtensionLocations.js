'use strict';
const _ = require('lodash');

function getExtensionLocations(extensions) {
  return _.map(extensions, (extension) => _.get(extension, 'attributes.location.app.package'));
}

module.exports = getExtensionLocations;
