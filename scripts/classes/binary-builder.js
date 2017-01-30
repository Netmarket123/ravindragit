'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const xcode = require('xcode');
const request = require('request');
const sharp = require('sharp');
const exec = require('child_process').exec;

function downloadImageToPath(imageUrl, path) {

}

class BinaryBuilder {
  constructor(config) {
    this.config = _.assign({}, config);
  }

  getPublishingProperties() {
    return new Promise((resolve, reject) => {
      request.get({
        url: `http://api.beta.shoutem.com/api/applications/publishing_properties.json?design_mode=false&device_type=iphone&platform=native&nid=${this.config.appId}&version=58`,
        headers: {
          Authorization: 'Basic My4xNHdlZUBnbWFpbC5jb206VVJINmhiRm1tcnZAdmc=',
        },
      }, (error, response, body) => {
        if (response.statusCode === 200) {
          this.publishingProperties = JSON.parse(body);
        } else {
          reject('Configuration download failed!');
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }
}

module.exports = BinaryBuilder;
