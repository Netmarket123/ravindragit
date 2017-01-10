'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').exec;

const bundleNameGenerators = {
  ios: () => 'main.jsbundle',
};

class AppBundle {
  constructor(config) {
    this.config = _.assign({}, config);
  }

  getOutputFolder() {
    return this.config.outputFolder || path.join('temp', `${this.config.appId}`);
  }

  getEntryFileName() {
    return `index.${this.config.platform}.js`;
  }

  getBundleName() {
    const platform = this.config.platform;
    const defaultNameGenerator = (p) => `index.${p}.bundle`;

    return _.get(bundleNameGenerators, platform, defaultNameGenerator)(platform);
  }

  runReactNativeBundle() {
    console.log('Starting react-native bundle\n');
    console.time('Build bundle');
    const assetsDest = this.getOutputFolder();
    const bundleOutput = path.join(assetsDest, this.getBundleName());
    const platform = this.config.platform;
    const dev = this.config.debug;
    const entryFile = this.getEntryFileName();
    const rnBundleCommand = [
      'react-native',
      'bundle',
      `--assets-dest ${assetsDest}`,
      `--bundle-output ${bundleOutput}`,
      `--platform ${platform}`,
      `--dev ${dev}`,
      `--entry-file ${entryFile}`,
    ];

    fs.mkdirSync(assetsDest);
    return new Promise((resolve, reject) => {
      const reactNativeBundleProcess = exec(rnBundleCommand.join(' '), error => {
        console.timeEnd('Build bundle');
        console.log('');
        if (error !== null) {
          console.log(`Bundling error: ${error}`);
          reject(error);
        }
        resolve(assetsDest);
      });

      reactNativeBundleProcess.stdout.pipe(process.stdout);
      reactNativeBundleProcess.stderr.pipe(process.stderr);
    });
  }
}

module.exports = AppBundle;
