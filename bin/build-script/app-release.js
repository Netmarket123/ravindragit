'use-strict';

const CodePush = require('code-push');
const AppBuild = require('./app-build');
const https = require('https');
const _ = require('lodash');

function getCodePushExtensionSettings(appConfiguration) {
  const codePushExtension = _.find(appConfiguration.included, {
    type: 'shoutem.core.extensions',
    id: 'shoutem.codepush',
  });

  if (!codePushExtension) {
    throw new Error('shoutem.codepush extension is not installed in app');
  }

  return _.get(codePushExtension, 'attributes.settings');
}

class AppRelease {
  constructor(config, codePushAccessKey, platform) {
    Object.assign(this, config);
    this.codePush = new CodePush(codePushAccessKey);
    this.platform = platform;
    this.appBuild = new AppBuild(config);
  }

  registerNewDeploymentKeys(deploymentKeys) {
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
          const extensionInstallation = response.data;
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
              data:  {
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
        }
      });
    });
  }

  setupAppRelease(appConfiguration) {
    const codePushExtensionSettings = getCodePushExtensionSettings(appConfiguration);
    const deploymentKeys = codePushExtensionSettings.deploymentKeys;

    if (!deploymentKeys || deploymentKeys.length < 1) {
      return this.codePush.addApp(this.appId)
        .then((app) => this.codePush.getDeployments(app.name))
        .then((deployments) => this.registerNewDeploymentKeys(deployments))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    }

    return Promise.resolve();
  }
  
  getDeploymentName() {
    return this.production
  }

  release() {
    this.codePush.release(this.appId, this.getDeploymentName())
  }
}
