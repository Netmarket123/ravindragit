'use strict';

const blacklist = require('./node_modules/react-native/packager/blacklist');

const path = require('path');

function getRoots() {
  if (__dirname.match(/node_modules[\/\\]react-native[\/\\]local-cli$/)) {
    // packager is running from node_modules of another project
    return [path.resolve(__dirname, '../..')];
  } else if (__dirname.match(/Pods[\/\\]React[\/\\]packager$/)) {
    // packager is running from node_modules of another project
    return [path.resolve(__dirname, '../..')];
  }

  return [path.resolve(__dirname)];
}

/**
 * Default configuration for the CLI.
 *
 * If you need to override any of this functions do so by defining the file
 * `rn-cli.config.js` on the root of your project with the functions you need
 * to tweak.
 */
const config = {
  getProjectRoots() {
    return getRoots();
  },

  /**
   * Specify where to look for assets that are referenced using
   * `image!<image_name>`. Asset directories for images referenced using
   * `./<image.extension>` don't require any entry in here.
   */
  getAssetRoots() {
    return getRoots();
  },

  /**
   * Returns a regular expression for modules that should be ignored by the
   * packager on a given platform.
   */
  getBlacklistRE(platform) {
    const root = this.getProjectRoots();
    const ignorePath = `${root}/scripts/`;
    return blacklist(platform, [ignorePath]);
  },
};

module.exports = config;
