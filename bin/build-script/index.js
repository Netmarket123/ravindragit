#!/usr/bin/env node

const AppBuild = require('./app-build');
const config = require('../config.json');
const commandLineArgs = require('command-line-args');

const cli = commandLineArgs([
  { name: 'appId', type: Number },
  { name: 'serverApiEndpoint', type: String },
  { name: 'debug', type: Boolean },
  { name: 'designMode', type: Boolean },
  { name: 'configurationFilePath', type: String },
  { name: 'workingDirectories', type: String, multiple: true },
  { name: 'extensionsJsPath', type: String },
]);

// merge command line arguments and config.json
const buildConfig = Object.assign(config, cli.parse());
const build = new AppBuild(buildConfig);
build.run();
