const fs = require('fs');
const AppBuild = require('./app-build');
const config = require('../config.json');
const cmdArgs = require('command-line-args');

const build = new AppBuild(config);
build.run();