#!/usr/bin/env node

const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const path = require('path');
const shelljs = require('shelljs');
const validateArgsWithConfig = require('./validate-args-with-config');

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
const config = require(configPath);
validateArgsWithConfig(cliArgs, config);

const runConfig = _.omit(cliArgs, 'platform');
const getRunArgument = (argument, value) => `--${argument} ${value}`;
const reactNativeRunCommand = _.reduce(runConfig, (command, value, argument) =>
  `${command} ${value ? (getRunArgument(argument, value)) : value}`
  , `react-native run-${cliArgs.platform}`);

console.log(reactNativeRunCommand);
shelljs.exec(reactNativeRunCommand);
