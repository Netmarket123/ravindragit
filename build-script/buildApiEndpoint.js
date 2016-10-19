'use strict';

function buildApiEndpoint(serverApiEndpoint, appId, path) {
  return `http://${serverApiEndpoint}/v1/apps/${appId}/${path}`;
}

module.exports = buildApiEndpoint;
