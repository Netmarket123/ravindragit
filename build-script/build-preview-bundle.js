#!/usr/bin/env node

const _ = require('lodash');
const AppBuild = require('./app-build');
const BundleCache = require('./bundle-cache');
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
  { name: 'authorization', type: String },
]);

// merge command line arguments and config.json
const buildConfig = _.merge(config, cli.parse());
const build = new AppBuild(buildConfig);
const bundleCache = new BundleCache(buildConfig);

build.prepareConfiguration()
  .then((configuration) => {
    if (bundleCache.shouldUseCachedBundle(configuration)) {
      return Promise.resolve(bundleCache.getCachedBundlePath());
    }
    return build.buildExtensions();
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
