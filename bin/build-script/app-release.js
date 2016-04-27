'use strict';

const CodePush = require('code-push');
const codePushExec = require('code-push-cli/script/command-executor');
const codePushCli = require('code-push-cli/definitions/cli');
const request = require('request');
const _ = require('lodash');

const deploymentNames = {
  production: 'Production',
  staging: 'Staging',
};

class AppRelease {
  constructor(config) {
    Object.assign(this, config);
    this.codePush = new CodePush(this.codePushAccessKey);
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
        url: `http://${this.serverApiEndpoint}/v1/apps/${this.appId}/installations/shoutem.codepush`,
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

  setup() {
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
    codePushExec.execute({
      type: codePushCli.CommandType.releaseReact,
      appName: `${this.appId}`,
      deploymentName: this.getDeploymentName(),
      platform: 'ios',
    })
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
