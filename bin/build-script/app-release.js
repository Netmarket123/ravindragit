'use-strict';

const CodePush = require('code-push');
const https = require('https');
const _ = require('lodash');

class AppRelease {
  constructor(config) {
    Object.assign(this, config);
    this.codePush = new CodePush(this.codePushAccessKey);
  }

  registerNewDeploymentKeysForInstallation(deploymentKeys, extensionInstallation) {
    return new Promise((resolve, reject) => {
      https.request({
        host: this.serverApiEndpoint,
        path: `/v1/apps/1/installations/${extensionInstallation.id}`,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
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
      }, (patchResponse) => {
        if (patchResponse.statusCode === 200) {
          resolve();
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  getCodePushExtensionInstallation() {
    return new Promise((resolve, reject) => {
      https.get({
        host: this.serverApiEndpoint,
        path: `/v1/apps/${this.appId}/installations/shoutem.codepush`,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
        },
      }, (response) => {
        if (response.statusCode === 200) {
          const extensionInstallation = response.body;
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
          this.codePush.addApp(this.appId)
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
    return this.production ? 'Production' : 'Staging';
  }

  release() {
    this.codePush.release(this.appId, this.getDeploymentName(), '.')
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
