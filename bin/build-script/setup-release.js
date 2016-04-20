#!/usr/bin/env node

const AppRelease = require('./app-release');
const config = require('../config.json');
const commandLineArgs = require('command-line-args');

const cli = commandLineArgs([
  { name: 'appId', type: Number },
  { name: 'serverApiEndpoint', type: String },
  { name: 'production', type: Boolean },
  { name: 'codePushAccessKey', type: String },
  { name: 'platform', type: String },
]);

// merge command line arguments and config.json
const releaseConfig = Object.assign(config, cli.parse());
const release = new AppRelease(releaseConfig);
release.setupAppRelease();
