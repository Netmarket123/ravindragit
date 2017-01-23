#!/usr/bin/env node

const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const path = require('path');
const fs = require('fs-extra');
const shelljs = require('shelljs');
const validateArgsWithConfig = require('./helpers/validate-args-with-config');

const cli = commandLineArgs([
  { name: 'platform', type: String },
  { name: 'simulator', type: String },
  { name: 'configuration', type: String },
  { name: 'scheme', type: String },
  { name: 'device', type: String },
  { name: 'udid', type: String },
  { name: 'variant', type: String },
]);

// merge command line arguments and config.json

const cliArgs = cli.parse();
const configPath = path.resolve('config.json');
const config = fs.readJsonSync(configPath);
validateArgsWithConfig(cliArgs, config);

const runConfig = _.omit(cliArgs, 'platform');
const getRunArgument = (argument, value) => `--${argument} ${value}`;
const reactNativeRunArguments = _.reduce(runConfig, (args, value, argument) =>
  `${args} ${value ? (getRunArgument(argument, value)) : value}`
  , '');

const reactNativeRunCommand = `react-native run-${cliArgs.platform} ${reactNativeRunArguments}`;
console.log(reactNativeRunCommand);
shelljs.exec(reactNativeRunCommand);
