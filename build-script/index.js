#!/usr/bin/env node

const _ = require('lodash');
const AppBuild = require('./app-build');
// eslint-disable-next-line import/no-unresolved
const config = require('../config.json');
const commandLineArgs = require('command-line-args');

const cli = commandLineArgs([
  { name: 'appId', type: Number },
  { name: 'serverApiEndpoint', type: String },
  { name: 'production', type: Boolean },
  { name: 'offlineMode', type: Boolean },
  { name: 'configurationFilePath', type: String },
  { name: 'workingDirectories', type: String, multiple: true },
  { name: 'extensionsJsPath', type: String },
  { name: 'codePushAccessKey', type: String },
  { name: 'platform', type: String },
]);

// merge command line arguments and config.json
const buildConfig = _.merge(config, cli.parse());
const build = new AppBuild(buildConfig);
build.run();
