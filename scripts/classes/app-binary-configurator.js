'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const request = require('request');
const sharp = require('sharp');
const plist = require('plist');

const iosBinarySettings = require('../configs/iosBinarySettings');
const androidBinarySettings = require('../configs/androidBinarySettings');
const binarySettings = {
  ios: iosBinarySettings,
  android: androidBinarySettings,
};

function downloadImage(imageUrl, savePath) {
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
  return downloadImage(imageUrl, downloadPath, resizeConfig).then((imagePath) => {
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

  getLegacyApiHost() {
    if (!this.config.legacyApiEndpoint) {
      process.exitCode = 1;
      throw new Error('legacyApiEndpoint is not set in build config.');
    }
    return this.config.legacyApiEndpoint;
  }

  getPublishingProperties() {
    return new Promise((resolve, reject) => {
      request.get({
        url: `http://${this.getLegacyApiHost()}/api/applications/publishing_properties.json?nid=${this.config.appId}`,
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
    // uploading launch image in builder only sets this image, so we are using it on both platforms
    return this.publishingProperties.iphone_launch_image_portrait;
  }

  configureLaunchScreen() {
    const launchScreen = this.getLaunchScreenUrl();
    const resizeConfig = this.binarySettings.launchScreen;
    console.log('Configuring launch screen...');
    return downloadAndResizeImage(launchScreen, './assets/launchScreen.png', resizeConfig);
  }

  getAppIconUrl() {
    // TODO (Ivan): Change this when android icon is available in publishing properties
    return this.publishingProperties.iphone_application_icon_hd_ios7;
  }

  configureAppIcon() {
    const appIcon = this.getAppIconUrl();
    const resizeConfig = this.binarySettings.appIcon;
    console.log('Configuring app icon...');
    return downloadAndResizeImage(appIcon, './assets/appIcon.png', resizeConfig);
  }

  getBinaryVersionName() {
    // we fallback to default one so CLI doesn't have to handle version
    return this.config.binaryVersionName || '5.0.0';
  }

  getBinaryVersionCode() {
    // we fallback to default one so CLI doesn't have to handle version
    return this.config.binaryVersionCode || 1;
  }

  configureAppInfoIOS() {
    console.log('Configuring Info.plist');
    const infoPlistPath = './ios/ShoutemApp/Info.plist';
    const infoPlistFile = fs.readFileSync(infoPlistPath, 'utf8');
    const infoPlist = plist.parse(infoPlistFile);
    infoPlist.CFBundleName = this.publishingProperties.iphone_title;
    infoPlist.CFBundleIdentifier = this.publishingProperties.iphone_bundle_id;
    infoPlist.CFBundleShortVersionString = this.getBinaryVersionName();
    infoPlist.LSApplicationCategoryType = this.publishingProperties.primary_category_name;
    fs.writeFileSync(infoPlistPath, plist.build(infoPlist));
  }

  configureAppInfoAndroid() {
    console.log('Configuring build.gradle');
    const buildGradlePath = './android/app/build.gradle';
    const buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
    const applicationId = this.publishingProperties.android_market_package_name;
    const newBuildGradle = buildGradle
      .replace(/applicationId\s.*/g, `applicationId '${applicationId}'`)
      .replace(/versionCode\s.*/g, `versionCode ${this.getBinaryVersionCode()}`)
      .replace(/versionName\s.*/g, `versionName '${this.getBinaryVersionName()}'`)
      .replace(/ShoutemApplicationName/g, this.publishingProperties.android_title);
    fs.writeFileSync(buildGradlePath, newBuildGradle);
  }

  configureAppInfo() {
    if (this.config.platform === 'ios') {
      this.configureAppInfoIOS();
    } else if (this.config.platform === 'android') {
      this.configureAppInfoAndroid();
    }
  }

  configureApp() {
    return this.getPublishingProperties()
      .then(() => this.configureLaunchScreen())
      .then(() => this.configureAppIcon())
      .then(() => this.configureAppInfo());
  }
}

module.exports = AppBinaryConfigurator;
