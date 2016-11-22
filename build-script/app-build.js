/* eslint global-require: "off" */
/* global require needs to be enabled because files to be required are
 * determined dynamically
*/

'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const rimraf = require('rimraf');
const process = require('process');
const request = require('request');
const exec = require('child_process').exec;
const yazl = require('yazl');

const getLocalExtensions = require('./getLocalExtensions');
const ExtensionsInstaller = require('./extensions-installer.js');
const buildApiEndpoint = require('./buildApiEndpoint');

const AppRelease = require('./app-release');

function getExtensionsFromConfiguration(configuration) {
  return _.filter(configuration.included, { type: 'shoutem.core.extensions' });
}

function getExtensionLocations(extensions) {
  return _.map(extensions, (extension) => _.get(extension, 'attributes.location.app.package'));
}

const bundleNameGenerators = {
  ios: () => 'main.jsbundle',
};

/**
 * AppBuild builds application by running build steps
 * @param  {Object} config
 *  {
 *      @key Number appId
 *      @key String serverApiEndpoint
 *      @key boolean debug builds debug build
 *      @key boolean designMode get designMode app configuration
 *      @key String configurationFilePath path to where app configuration should be saved
 *      @key String extensionsDir local extensions directory
 *      @key String extensionsJsPath path to extension.js
 *  }
 */
class AppBuild {
  constructor(config) {
    this.buildConfig = _.assign({ cacheFolder: 'cache' }, config);
    if (config.runReleaseSteps && !this.isBuildingBaseApp()) {
      this.appRelease = new AppRelease(this.buildConfig);
    }
  }

  isBuildingBaseApp() {
    const { baseAppId, appId } = this.buildConfig;
    return baseAppId === appId;
  }

  shouldUseCachedBundle(extensions) {
    const cachedExtensions = getExtensionsFromConfiguration(require('../bundle-test/configuration.json'));
    let cachedBundleExists;

    if (this.isBuildingBaseApp()) {
      try {
        cachedBundleExists = fs.statSync(this.getCachedBundlePath()).isFile();
      } catch (err) {
        cachedBundleExists = false;
      }
    }

    return _.isEqual(getExtensionLocations(extensions), getExtensionLocations(cachedExtensions)) &&
      !cachedBundleExists;
  }

  getConfigurationUrl() {
    const serverApiEndpoint = this.buildConfig.serverApiEndpoint;
    const appId = this.buildConfig.appId;
    const production = this.buildConfig.production;
    const path = `configurations/current`;

    return buildApiEndpoint(serverApiEndpoint, appId, path, production);
  }

  downloadConfiguration() {
    console.time('download configuration');
    return new Promise((resolve, reject) => {
      request.get({
        url: this.getConfigurationUrl(),
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }, (error, response, body) => {
        if (response.statusCode === 200) {
          const configuration = JSON.parse(body);
          console.timeEnd('download configuration');
          resolve(configuration);
        } else {
          reject('Configuration download failed!');
        }
      }).on('error', err => {
        reject(err);
      });
    });
  }

  prepareExtensions(extensions) {
    const localExtensions = getLocalExtensions(this.buildConfig.workingDirectories);
    const extensionsJsPath = this.buildConfig.extensionsJsPath;
    const extensionsInstaller = new ExtensionsInstaller(
      localExtensions,
      extensions,
      extensionsJsPath
    );

    return extensionsInstaller.installExtensions(this.buildConfig.production)
      .then((installedExtensions) => {
        const extensionsJs = extensionsInstaller.createExtensionsJs(installedExtensions);
        const preBuild = this.executeBuildLifecycleHook(installedExtensions, 'preBuild');

        return Promise.all([extensionsJs, preBuild]);
      });
  }

  executeBuildLifecycleHook(extensions, lifeCycleStep) {
    console.time(`${lifeCycleStep}`);
    _.forEach(extensions, (extension) => {
      if (extension && extension.id) {
        try {
          const build = require(path.join(extension.id, 'build.js'));
          const buildLifeCycle = _.get(build, lifeCycleStep);
          if (_.isFunction(buildLifeCycle)) {
            const initialWorkingDirectory = process.cwd();
            // run extension build hook in its own folder
            console.time(`[running ${lifeCycleStep}] - ${extension.id}`);
            process.chdir(path.join('node_modules', extension.id));
            buildLifeCycle(this.configuration, this.buildConfig);
            // return to the build script original working directory
            console.timeEnd(`[running ${lifeCycleStep}] - ${extension.id}`);
            process.chdir(initialWorkingDirectory);
          }
        } catch (e) {
          if (e.code !== 'MODULE_NOT_FOUND') {
            console.log(e);
            process.exit(1);
          }
        }
      }
    });
    console.timeEnd(`${lifeCycleStep}`);
    return Promise.resolve();
  }

  removeBabelrcFiles() {
    console.time('removing .babelrc files');

    rimraf.sync(path.join('.', 'node_modules', '*', '.babelrc'));

    console.timeEnd('removing .babelrc files');
    console.log('');
  }

  cleanTempFolder() {
    console.time('cleaning temp files');
    rimraf.sync(path.join('.', 'temp', '*'));
    console.timeEnd('cleaning temp files');
  }

  prepareConfiguration() {
    if (this.buildConfig.offlineMode) {
      const configuration = require(path.resolve(this.buildConfig.configurationFilePath));
      // Nothing to do, resolve to proceed with next build step
      return Promise.resolve(configuration);
    }
    return this.downloadConfiguration();
  }

  buildExtensions(configuration) {
    return this.prepareExtensions(configuration).then(() => this.removeBabelrcFiles());
  }

  getBinaryVersion() {
    // TODO(Ivan): read binary version from app configuration
    return '1.0.0';
  }

  getOutputFolder() {
    return path.join('temp', `${this.buildConfig.appId}`);
  }

  getEntryFileName() {
    return `index.${this.buildConfig.platform}.js`;
  }

  getBundleName() {
    const platform = this.buildConfig.platform;
    const defaultNameGenerator = (platform) => `index.${platform}.bundle`;

    return _.get(bundleNameGenerators, platform, defaultNameGenerator)(platform);
  }

  runReactNativeBundle() {
    console.log('Starting react-native bundle\n');
    console.time('Build bundle');
    const assetsDest = this.getOutputFolder();
    const bundleOutput = path.join(assetsDest, this.getBundleName());
    const platform = this.buildConfig.platform;
    const dev = !this.buildConfig.production;
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
          console.log('Bundling error: ' + error);
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
      const packagePath = `${bundleFolder}.zip`
      const writeStream = fs.createWriteStream(packagePath);
      zipFile.outputStream.pipe(writeStream)
        .on("error", function (error) {
          reject(error);
        })
        .on("close", function () {
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
    return this.runReactNativeBundle().then((bundleFolderPath) => this.zipBundle(bundleFolderPath))
  }

  cacheBundle(bundlePath) {
    try {
      fs.mkdirSync(this.buildConfig.cacheFolder);
    } catch (error) {
      if (error.code === 'EEXIST') {
        console.log('Cache folder already exists. Continue with caching.')
      }
    }
    fs.copySync(bundlePath, this.getCachedBundlePath());
    fs.writeJsonSync(this.getCachedConfigurationPath(), this.configuration);
  }

  getCachedConfigurationPath() {
    return path.join(this.buildConfig.cacheFolder, 'configuration.json')
  }

  getCachedBundlePath() {
    return path.join(this.buildConfig.cacheFolder, `${this.buildConfig.baseAppId}.zip`);
  }

  run() {
    console.time('build time');
    console.log(`starting build for app ${this.buildConfig.appId}`);
    // clear any previous build's temp files
    this.cleanTempFolder();
    this.prepareConfiguration()
      .then((configuration) => {
        this.configuration = configuration;
        if (this.appRelease) {
          return this.appRelease.setup(configuration);
        }
      })
      .then(() => {
        const extensions = getExtensionsFromConfiguration(this.configuration);
        if (this.shouldUseCachedBundle(extensions)) {
          return Promise.resolve(this.getCachedBundlePath());
        }
        return this.buildExtensions(extensions)
          .then(() => this.prepareReleasePackage())
      })
      .then((packagePath) => {
        if (this.isBuildingBaseApp()) {
          return this.cacheBundle(packagePath);
        } else if (this.appRelease) {
          return this.appRelease.release(packagePath, this.getBinaryVersion())
        }
      })
      .then(() => {
        console.timeEnd('build time');
        if (this.buildConfig.workingDirectories.length) {
          const runWatchInNewWindow = require('./runWatchInNewWindow.js');
          runWatchInNewWindow();
        }
        // clear after yourself
        this.cleanTempFolder();
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  }
}

module.exports = AppBuild;
