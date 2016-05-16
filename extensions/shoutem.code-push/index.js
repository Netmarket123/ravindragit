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
  let oldExtensions;
  store.subscribe(() => {
    const state = store.getState();
    const extensions = state['shoutem.application'].extensions;
    // Try to sync only of there are any changes on extensions
    if (extensions !== oldExtensions) {
      const codePushExtension = _.find(extensions, { id: 'shoutem.codepush' });
      const deployments = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
      // TODO (Ivan): Change this to use deployment name depending on environment
      const deployment = _.find(deployments, { name: 'Staging' });
      // Update package if there are any new changes.
      // Update dialog is hidden by default
      syncPackage(deployment.key);

      oldExtensions = extensions;
    }
  });
}
