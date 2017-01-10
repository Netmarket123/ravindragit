#!/usr/bin/env node

const _ = require('lodash');
const AppBuild = require('./app-build');
const AppBundle = require('./app-bundle');
// eslint-disable-next-line import/no-unresolved
const commandLineArgs = require('command-line-args');
const path = require('path');

const cli = commandLineArgs([
  { name: 'configPath', type: String },
  { name: 'appId', type: Number },
  { name: 'serverApiEndpoint', type: String },
  { name: 'production', type: Boolean },
  { name: 'offlineMode', type: Boolean },
  { name: 'configurationFilePath', type: String },
  { name: 'workingDirectories', type: String, multiple: true },
  { name: 'extensionsJsPath', type: String },
  { name: 'platform', type: String },
  { name: 'authorization', type: String },
  { name: 'outputFolder', type: String },
]);

// merge command line arguments and config.json

const cliArgs = cli.parse();
const configPath = cliArgs.configPath || path.resolve('config.json');
const config = require(configPath);
// merge command line arguments and config.json and do not wait for native dependencies
const buildConfig = _.merge(config, cliArgs, { skipNativeDependencies: true });
const build = new AppBuild(buildConfig);
const bundle = new AppBundle(buildConfig);

build.run().then(() => bundle.runReactNativeBundle());
