#!/usr/bin/env node

const AppRelease = require('./app-release');
const AppBuild = require('./app-build');
const BundleCache = require('./bundle-cache');
// eslint-disable-next-line import/no-unresolved
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
const releaseConfig = Object.assign({}, config, cli.parse());
const app = new AppRelease(releaseConfig);
const build = new AppBuild(releaseConfig);
const bundleCache = new BundleCache(releaseConfig);
let appConfiguration;
build.cleanTempFolder();
build.prepareConfiguration()
  .then((configuration) => {
    appConfiguration = configuration;
    if (bundleCache.shouldUseCachedBundle(appConfiguration)) {
      return Promise.resolve(bundleCache.getCachedBundlePath());
    }
    return app.prepareReleasePackage();
  })
  .then((packagePath) => {
    if (bundleCache.shouldCacheBundle()) {
      return bundleCache.cacheBundle(packagePath, appConfiguration);
    }
    return app.release(packagePath);
  })
  .then(() => build.cleanTempFolder())
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
