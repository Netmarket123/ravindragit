import codePush from 'react-native-code-push';
import * as _ from 'lodash';

/**
 * Calls Code Push sync method to synchronize app package with changes
 * deployed on Code Push identified by provided deployment key
 * If deployment key is not provided, the one from app's binary would be used
 * @param deploymentKey {String} codePush deploymentKey with which app should be synchronized
 * @param updateDialog (optional) {Object || Boolean} determine should app user be warned
 * about app update (not recommended to do on iOS)
 */
function syncPackage(deploymentKey, updateDialog) {
  codePush.sync({
    installMode: codePush.InstallMode.IMMEDIATE,
    deploymentKey,
    updateDialog,
  });
}

export function appDidMount(app) {
  const store = app.getStore();
  let oldExtensionIds = [];
  store.subscribe(() => {
    const state = store.getState();
    const extensions = state['shoutem.application'].extensions;
    const extensionIds = _.map(extensions, (extension) => extension.id);
    const codePushExtension = _.find(extensions, { id: 'shoutem.code-push' });
    if (_.difference(extensionIds, oldExtensionIds).length > 0) {
      const deployments = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
      // TODO (Ivan): Change this to use deployment name depending on environment
      const deployment = _.find(deployments, { name: 'Staging' });
      // Update package if there are any new changes.
      // Update dialog is hidden by default
      if (deployment && deployment.key) {
        syncPackage(deployment.key, true);
      }
      oldExtensionIds = extensionIds;
    }
  });
}
