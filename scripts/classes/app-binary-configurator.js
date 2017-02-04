'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const sharp = require('sharp');
const plist = require('plist');

const iosBinarySettings = require('../configs/iosBinarySettings');
const androidBinarySettings = require('../configs/androidBinarySettings');
const binarySettings = {
  ios: iosBinarySettings,
  android: androidBinarySettings,
};

function downloadImageToPath(imageUrl, savePath) {
  return new Promise((resolve, reject) => {
    request(imageUrl)
      .pipe(fs.createWriteStream(savePath))
      .on('error', () => reject())
      .on('finish', () => resolve(savePath));
  });
}

/**
 * Downloads image to downloadPath and saves resized images
 * to savePath defined in resizeConfig.
 * @param {string} imageUrl - URL of the image to be downloaded
 * @param {string} downloadPath - Path where original image would be located after download
 * @param {Object} resizeConfig - Object with definition of resulting images
 * @param {Array} resizeConfig.images - Array of image object where image is defined by
 * object: { savePath: {string}, width: {number}, height: {number} }
 * @returns {*|Promise.<TResult>|Promise<T>}
 */
function downloadAndResizeImage(imageUrl, downloadPath, resizeConfig) {
  return downloadImageToPath(imageUrl, downloadPath, resizeConfig).then((imagePath) => {
    const resizingPromises = _.map(resizeConfig.images, (image) =>
      new Promise((resolve, reject) => {
        sharp(imagePath)
          .resize(image.width, image.height)
          .png()
          .toFile(image.savePath)
          .then(() => resolve())
          .catch((error) => reject(error));
      })
    );

    return Promise.all(resizingPromises);
  });
}

class AppBinaryConfigurator {
  constructor(config) {
    this.config = _.assign({}, config);
    this.binarySettings = binarySettings[this.config.platform];
  }

  getPublishingProperties() {
    return new Promise((resolve, reject) => {
      request.get({
        url: `http://api.dev.sauros.hr/api/applications/publishing_properties.json?design_mode=false&device_type=iphone&platform=native&nid=${this.config.appId}&version=58`,
        headers: {
          Authorization: `Bearer ${this.config.authorization}`,
        },
      }, (error, response, body) => {
        if (response.statusCode === 200) {
          this.publishingProperties = JSON.parse(body);
          resolve();
        } else {
          reject(`Publishing info download failed with code: ${response.statusCode}`);
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  getLaunchScreenUrl() {
    return this.publishingProperties.iphone_launch_image_portrait;
  }

  configureLaunchScreen() {
    const launchScreen = this.getLaunchScreenUrl();
    const resizeConfig = this.binarySettings.launchScreen;
    console.log('Setting launch screen...');
    return downloadAndResizeImage(launchScreen, './assets/launchScreen.png', resizeConfig);
  }

  getAppIconUrl() {
    return this.publishingProperties.iphone_application_icon_hd_ios7;
  }

  configureAppIcon() {
    const appIcon = this.getAppIconUrl();
    const resizeConfig = this.binarySettings.appIcon;
    console.log('Setting app icon...');
    return downloadAndResizeImage(appIcon, './assets/appIcon.png', resizeConfig);
  }

  configureAppInfo() {
    console.log('Setting Info.plist');
    const infoPlistFile = fs.readFileSync('./ios/ShoutemApp/Info.plist', 'utf8');
    const infoPlist = plist.parse(infoPlistFile);
    infoPlist.CFBundleName = this.publishingProperties.iphone_title;
    infoPlist.CFBundleIdentifier = this.publishingProperties.iphone_bundle_id;
    infoPlist.CFBundleShortVersionString = this.config.binaryVersionName || '5.0.0';
    fs.writeFileSync('./ios/ShoutemApp/Info.plist', plist.build(infoPlist));
  }

  configureApp() {
    return this.getPublishingProperties()
      .then(() => this.configureLaunchScreen())
      .then(() => this.configureAppIcon())
      .then(() => this.configureAppInfo());
  }
}

module.exports = AppBinaryConfigurator;
