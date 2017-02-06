'use strict';

const _ = require('lodash');
const path = require('path');
const spawn = require('superspawn').spawn;
const shell = require('shelljs');

class AppBuilder {
  constructor(config) {
    this.config = _.assign({}, config);
  }

  getOutputDirectory() {
    return this.config.outputDirectory || path.join('temp', `${this.config.appId}`);
  }

  build() {
    spawn('xcodebuild', [
      'archive',
      '-workspace',
      'ios/ShoutemApp.xcworkspace',
      '-scheme',
      'ShoutemApp',
      '-configuration',
      'Release',
      '-archivePath',
      `${path.join(this.getOutputDirectory(), 'ShoutemApp.xcarchive')}`,
      'CODE_SIGNING_REQUIRED=NO',
      'CODE_SIGN_IDENTITY=',
    ], {
      stderr: 'inherit',
      stdio: 'inherit',
    }).then(() =>
      spawn('xcodebuild', [
        '-exportArchive',
        '-exportFormat',
        'ipa',
        '-archivePath',
        `${path.join(this.getOutputDirectory(), 'ShoutemApp.xcarchive')}`,
        '-exportPath',
        `${path.join(this.getOutputDirectory(), 'ShoutemApp.ipa')}`,
      ], { stderr: 'inherit', stdio: 'inherit' })
    );
  }
}

module.exports = AppBuilder;