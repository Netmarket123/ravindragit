// setup jsdom globally so that we can mount
// React components in the tests.

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

documentRef = document;
require("babel-register")({
  // TODO(Zeljko) - Find better way to transpile ES6 modules
  // https://babeljs.io/docs/usage/require/
  // ignore -> do not transpile modules which are not from shoutem, in other words
  // transpile shoutem modules
  ignore: /^(?=.*node_modules)(?!.*@shoutem).*/,
});
