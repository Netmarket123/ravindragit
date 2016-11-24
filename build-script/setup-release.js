#!/usr/bin/env node
const fs = require('fs-extra');
const commandLineArgs = require('command-line-args');
const AppRelease = require('./app-release');
const AppBuild = require('./app-build');
// eslint-disable-next-line import/no-unresolved
const config = require('../config.json');

const cli = commandLineArgs([
  { name: 'appId', type: Number },
  { name: 'serverApiEndpoint', type: String },
  { name: 'production', type: Boolean },
  { name: 'codePushAccessKey', type: String },
  { name: 'platform', type: String },
]);

// merge command line arguments and config.json
const releaseConfig = Object.assign({}, config, cli.parse());
const build = new AppBuild(releaseConfig);

build.downloadConfiguration()
  .then((configuration) => {
    if (!build.isBuildingBaseApp()) {
      const release = new AppRelease(releaseConfig);
      release.setup(configuration);
    }
    fs.writeJsonSync(releaseConfig.configurationFilePath, configuration);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
