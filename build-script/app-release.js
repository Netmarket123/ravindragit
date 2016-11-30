'use strict';

const CodePush = require('code-push');
const request = require('request');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').exec;
const yazl = require('yazl');
const buildApiEndpoint = require('./buildApiEndpoint');

const deploymentNames = {
  production: 'Production',
  staging: 'Staging',
};

const IDENTICAL_PACKAGE_ERROR_KEYWORDS = ['uploaded', 'package', 'identical', 'same'];

const deploymentKeyValidationErrorHandlers = [{
  canHandle(error) {
    return parseInt(error.statusCode, 10) === 404;
  },
  handleFunction(codePushExtension) {
    console.log('create app on CodePush');
    return this.codePush.addApp(this.getCodePushAppName())
      .then((app) => this.saveDeploymentKeys(app.name, codePushExtension));
  },
}];

function getMissingDeploymentKeys(deploymentKeys) {
  return _.filter(deploymentNames, (deploymentName) =>
    !_.some(deploymentKeys, { name: deploymentName })
  );
}


function hasDefaultDeploymentKeys(deploymentKeys) {
  return getMissingDeploymentKeys(deploymentKeys).length < 1;
}

const bundleNameGenerators = {
  ios: () => 'main.jsbundle',
};

class AppRelease {
  constructor(config) {
    this.config = _.assign({}, config);
    this.codePush = new CodePush(config.codePushAccessKey);
  }

  getCodePushAppName() {
    return `${this.config.appId}`;
  }

  getExtensionInstallationEndpoint(extensionInstallation) {
    const serverApiEndpoint = this.config.serverApiEndpoint;
    const appId = this.config.appId;
    const production = this.config.production;
    const path = `installations/${extensionInstallation}`;
    return buildApiEndpoint(serverApiEndpoint, appId, path, production);
  }

  registerNewDeploymentKeysForInstallation(deploymentKeys, extensionInstallation) {
    return new Promise((resolve, reject) => {
      request({
        url: this.getExtensionInstallationEndpoint(extensionInstallation.id),
        headers: {
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

  getCodePushExtensionInstallation(appConfiguration) {
    console.log('Get extension installation');
    return _.find(appConfiguration.included, {
      type: 'shoutem.core.extensions',
      id: 'shoutem.code-push',
    });
  }

  validateDeploymentKeys(deploymentKeys) {
    console.log('validate deployment keys');
    return new Promise((resolve, reject) => {
      this.codePush.getDeployments(this.getCodePushAppName())
        .then((appDeployments) => {
          if (hasDefaultDeploymentKeys(appDeployments)) {
            const areDeploymentKeysValid = _.difference(appDeployments, deploymentKeys).length;
            return resolve(areDeploymentKeysValid);
          }
          console.log('App does not have all default deployment keys on Code Push');
          return this.createMissingDeploymentKeys().then(() => resolve(false));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createDeploymentKey(deploymentKeyName) {
    console.log(`Creating deployment key: ${deploymentKeyName}`);
    return this.codePush.addDeployment(this.getCodePushAppName(), deploymentKeyName);
  }

  createMissingDeploymentKeys(deploymentKeys) {
    console.log('Creating deployment keys on Code Push...');
    const missingDeploymentKeys = getMissingDeploymentKeys(deploymentKeys);
    return Promise.all(_.map(missingDeploymentKeys, (name) => this.createDeploymentKey(name)));
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

  setup(appConfiguration) {
    const codePushExtension = this.getCodePushExtensionInstallation(appConfiguration);

    if (_.isEmpty(codePushExtension)) {
      console.error([
        'App you are trying to build doesn\'t',
        'have Shoutem Code Push extension installed',
      ]);
      process.exit(1);
    }

    const deploymentKeys = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
    return this.validateDeploymentKeys(deploymentKeys)
      .then((areDepoymentKeysValid) => {
        if (areDepoymentKeysValid) {
          console.log(`App ${this.getCodePushAppName()} has valid deployment keys`);
        } else {
          if (hasDefaultDeploymentKeys(deploymentKeys)) {
            console.log('App does not have all default deployment keys saved');
          } else {
            console.log(`App ${this.getCodePushAppName()} has invalid deployment keys`);
          }
          this.saveDeploymentKeys(this.getCodePushAppName(), codePushExtension);
        }
      })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        const errorHandler = _.first(deploymentKeyValidationErrorHandlers,
          handler => handler.canHandle(error));
        if (errorHandler) {
          return errorHandler.handleFunction.bind(this)(codePushExtension);
        }
        console.error(error);
        process.exit(1);
      });
  }

  getDeploymentName() {
    return this.config.production ? deploymentNames.production : deploymentNames.staging;
  }

  getBinaryVersion() {
    // TODO(Ivan): read binary version from app configuration
    return '1.0.0';
  }

  getOutputFolder() {
    return path.join('temp', `${this.config.appId}`);
  }

  getEntryFileName() {
    return `index.${this.config.platform}.js`;
  }

  getBundleName() {
    const platform = this.config.platform;
    const defaultNameGenerator = (p) => `index.${p}.bundle`;

    return _.get(bundleNameGenerators, platform, defaultNameGenerator)(platform);
  }

  runReactNativeBundle() {
    console.log('Starting react-native bundle\n');
    console.time('Build bundle');
    const assetsDest = this.getOutputFolder();
    const bundleOutput = path.join(assetsDest, this.getBundleName());
    const platform = this.config.platform;
    const dev = this.config.debug;
    const entryFile = this.getEntryFileName();
    const rnBundleCommand = [
      'react-native',
      'bundle',
      `--assets-dest ${assetsDest}`,
      `--bundle-output ${bundleOutput}`,
      `--platform ${platform}`,
      `--dev ${dev}`,
      `--entry-file ${entryFile}`,
    ];

    fs.mkdirSync(assetsDest);
    return new Promise((resolve, reject) => {
      const reactNativeBundleProcess = exec(rnBundleCommand.join(' '), error => {
        console.timeEnd('Build bundle');
        console.log('');
        if (error !== null) {
          console.log(`Bundling error: ${error}`);
          reject(error);
        }
        resolve(assetsDest);
      });

      reactNativeBundleProcess.stdout.pipe(process.stdout);
      reactNativeBundleProcess.stderr.pipe(process.stderr);
    });
  }

  zipBundle(bundleFolder) {
    console.log('Zipping the bundle');
    return new Promise((resolve, reject) => {
      const files = fs.walkSync(bundleFolder);
      const zipFile = new yazl.ZipFile();
      const packagePath = `${bundleFolder}.zip`;
      const writeStream = fs.createWriteStream(packagePath);
      zipFile.outputStream.pipe(writeStream)
        .on('error', function (error) {
          reject(error);
        })
        .on('close', function () {
          resolve(packagePath);
        });

      _.forEach(files, (file) => {
        const pathInZip = path.relative(bundleFolder, file);
        zipFile.addFile(file, pathInZip);
      });
      zipFile.end();
    });
  }

  prepareReleasePackage() {
    return this.runReactNativeBundle().then((bundleFolderPath) => this.zipBundle(bundleFolderPath));
  }

  release(packagePath) {
    console.time('Code Push release');
    return this.codePush.release(this.getCodePushAppName(),
      this.getDeploymentName(), packagePath, this.getBinaryVersion(), {}, currentProgress => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        const lastChar = currentProgress === 100 ? '\n' : '';
        process.stdout.write(`Uploading bundle: ${Math.round(currentProgress)}%${lastChar}`);
      })
      .then(() => {
        console.timeEnd('Code Push release');
        console.log('App is successfully released');
      })
      .catch((error) => {
        console.warn(error);
        if (!_.intersection(error.message.split(' '), IDENTICAL_PACKAGE_ERROR_KEYWORDS).length) {
          process.exit(1);
        }
      });
  }
}

module.exports = AppRelease;
