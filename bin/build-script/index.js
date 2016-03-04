#!/usr/bin/env node

const AppBuild = require('./app-build');
const config = require('../config.json');

const build = new AppBuild(config);
build.run();
