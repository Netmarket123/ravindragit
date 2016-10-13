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

const deploymentKeyValidationErrorHandlers = [{
  canHandle(error) {
    return parseInt(error.statusCode, 10) === 404;
  },
  handleFunction(codePushExtension) {
    console.log('create app on CodePush');
    this.codePush.addApp(`${this.appId}`)
      .then((app) => this.saveDeploymentKeys(app.name, codePushExtension));
  },
}];

class AppRelease {
  constructor(config) {
    Object.assign(this, config);
    this.codePush = new CodePush(this.codePushAccessKey);
    this.setCodePushAppName(config.appId);
  }

  setCodePushAppName(appName) {
    this.codePushAppName = appName;
  }

  getCodePushAppName() {
    return this.codePushAppName;
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
        url: `http://${this.serverApiEndpoint}/v1/apps/${this.appId}/installations/shoutem.code-push`,
        headers: {
          Authorization: this.authorization,
          Accept: 'application/vnd.api+json',
        },
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            const extensionInstallation = JSON.parse(body).data;
            resolve(extensionInstallation);
          } catch (exception) {
            reject(exception);
          }
        }
      }).on('error', (error) => reject(error));
    });
  }

  validateDeploymentKeys(deploymentKeys) {
    console.log('validate deployment keys');
    return new Promise((resolve, reject) => {
      this.codePush.getDeployments(`${this.getCodePushAppName()}`)
        .then((appDeployments) => resolve(_.difference(appDeployments, deploymentKeys).length))
        .catch((error) => {
          reject(error);
        });
    });
  }

  saveDeploymentKeys(appName, codePushExtensionInstallation) {
    console.log(`Saving new deployment keys for app: ${appName}`);
    this.codePush.getDeployments(appName)
      .then((deployments) =>
      this.registerNewDeploymentKeysForInstallation(deployments, codePushExtensionInstallation))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }

  setup() {
    this.getCodePushExtensionInstallation()
      .then((codePushExtension) => {
        const deploymentKeys = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
        this.validateDeploymentKeys(deploymentKeys)
          .then((areDepoymentKeysValid) => {
            if (areDepoymentKeysValid) {
              console.log(`App ${this.getCodePushAppName()} has valid deployment keys`);
            } else {
              this.saveDeploymentKeys(`${this.appName}`, codePushExtension);
            }
          })
          .catch((error) => {
            const errorHandler = _.first(deploymentKeyValidationErrorHandlers,
              handler => handler.canHandle(error));
            errorHandler.handleFunction.bind(this)(codePushExtension);
          });
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
      appName: `${this.getCodePushAppName()}`,
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
