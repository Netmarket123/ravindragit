'use strict';

const path = require('path');
const androidResourcesDirectory = './android/app/src/main/res';

module.exports = {
  launchScreen: {
    images: [{
      savePath: 'icon-1.png',
      width: 320,
      height: 480,
    }, {
      name: 'icon-2.png',
      width: 640,
      height: 960,
    }, {
      name: 'icon-3.png',
      width: 640,
      height: 1136,
    }, {
      name: 'icon-4.png',
      width: 1242,
      height: 2208,
    }, {
      name: 'icon-5.png',
      width: 750,
      height: 1334,
    }, {
      name: 'icon-7.png',
      width: 640,
      height: 960,
    }, {
      name: 'icon-8.png',
      width: 640,
      height: 1136,
    }],
  },
  appIcon: {
    images: [{
      savePath: path.join(androidResourcesDirectory, 'mipmap-hdpi', 'ic_launcher.png'),
      width: 72,
      height: 72,
    }, {
      savePath: path.join(androidResourcesDirectory, 'mipmap-mdpi', 'ic_launcher.png'),
      width: 48,
      height: 48,
    }, {
      savePath: path.join(androidResourcesDirectory, 'mipmap-xhdpi', 'ic_launcher.png'),
      width: 96,
      height: 96,
    }, {
      savePath: path.join(androidResourcesDirectory, 'mipmap-xxhdpi', 'ic_launcher.png'),
      width: 144,
      height: 144,
    }],
  },
};
