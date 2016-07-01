import * as _ from 'lodash';
import { navigateTo } from '@shoutem/core/navigation';

/**
 * Creates screen settings for given shortcut.
 * Combines settings with other needed shortcut attributes.
 *
 * @param shortcut {{}}
 * @returns {{title: *}}
 */
function createScreenSettings(shortcut) {
  return {
    title: shortcut.title,
    ..._.get(shortcut, 'attributes.settings', {}),
  };
}

export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    const actionName = _.get(action, 'shortcut.attributes.action');
    const screenName = _.get(action, 'shortcut.attributes.screen');

    if (!actionName && !screenName) {
      return next(action);
    }

    const settings = createScreenSettings(action.shortcut);
    const children = _.get(action.shortcut, 'relationships.children.data');
    if (actionName) {
      const shortcutAction = actions[actionName];

      if (typeof shortcutAction === 'function') {
        return next(shortcutAction(settings, children, store.getState()));
      }

      throw new Error(`Shortcut you tried to execute has no valid action (${actionName}),
      or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
    }

    if (screenName) {
      const openScreenAction = () =>
        navigateTo({
          screen: screenName,
          props: {
            children,
            ...settings,
          },
        });

      // No need for error handling, if screen is invalid navigate to will throw Exception
      return next(openScreenAction());
    }
  };
}
