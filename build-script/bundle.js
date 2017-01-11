#!/usr/bin/env node

const _ = require('lodash');
const AppBundle = require('./app-bundle');
// eslint-disable-next-line import/no-unresolved
const commandLineArgs = require('command-line-args');
const path = require('path');
const validateArgsWithConfig = require('./validate-args-with-config');

const cli = commandLineArgs([
  { name: 'platform', type: String },
  { name: 'outputFolder', type: String },
]);

const cliArgs = cli.parse();
const configPath = path.resolve('config.json');
const config = require(configPath);
validateArgsWithConfig(cliArgs, config);

// merge command line arguments and config.json
const buildConfig = _.merge(config, cliArgs);
const bundle = new AppBundle(buildConfig);

bundle.runReactNativeBundle();
