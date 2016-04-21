'use strict';

const CodePush = require('code-push');
const request = require('request');
const _ = require('lodash');

const deploymentNames = {
  production: 'Production',
  staging: 'Staging',
};

const binFolderPath = '../';

class AppRelease {
  constructor(config) {
    Object.assign(this, config);
    this.codePush = new CodePush(this.codePushAccessKey);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  registerNewDeploymentKeysForInstallation(deploymentKeys, extensionInstallation) {
    return new Promise((resolve, reject) => {
      request({
        url: `http://${this.serverApiEndpoint}/v1/apps/${this.appId}/installations/${extensionInstallation.id}`,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        method: 'PATCH',
        json: true,
        body: {
          data: {
            type: 'shoutem.core.installations',
            id: extensionInstallation.id,
            attributes: {
              settings: {
                deploymentKeys,
              },
            },
          },
        },
      }, (error, patchResponse) => {
        if (!error && patchResponse.statusCode === 200) {
          resolve();
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  getCodePushExtensionInstallation() {
    console.log('get extension installation');
    return new Promise((resolve, reject) => {
      request.get({
        url: `http://${this.serverApiEndpoint}/v1/apps/${this.appId}/installations/gannet.news`,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
        },
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const extensionInstallation = JSON.parse(body).data;
          resolve(extensionInstallation);
        }
      }).on('error', (error) => reject(error));
    });
  }

  setupAppRelease() {
    this.getCodePushExtensionInstallation()
      .then((codePushExtension) => {
        const deploymentKeys = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
        if (!deploymentKeys || deploymentKeys.length < 1) {
          console.log('create app on CodePush');
          this.codePush.addApp(`${this.appId}`)
            .then((app) => this.codePush.getDeployments(app.name))
            .then((deployments) =>
              this.registerNewDeploymentKeysForInstallation(deployments, codePushExtension))
            .catch((error) => {
              console.error(error);
              process.exit(1);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }

  getDeploymentName() {
    return this.production ? deploymentNames.production : deploymentNames.staging;
  }

  release() {
    this.codePush.release(this.appId, this.getDeploymentName(), binFolderPath)
      .then(() =>
        console.log(`App with id:${this.appId} is successfully released`)
      )
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
}

module.exports = AppRelease;
