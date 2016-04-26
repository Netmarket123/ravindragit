import codePush from 'react-native-code-push';
import * as _ from 'lodash';

export function appDidMount(app) {
  // Active update, which lets the end user know
  // about each update, and displays it to them
  // immediately after downloading it
  const store = app.getStore();
  const state = store.getState();
  let oldExtensions;
  store.subscribe(() => {
    const extensions = state['shoutem.application'].extensions;
    if (extensions !== oldExtensions) {
      oldExtensions = extensions;
      const codePushExtension = _.find(extensions, { id: 'shoutem.codepush' });
      const deployments = _.get(codePushExtension, 'attributes.settings.deploymentKeys');
      const deployment = _.find(deployments, { name: 'Staging' });
      codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        deploymentKey: deployment.key,
      });
    }
  });
}
