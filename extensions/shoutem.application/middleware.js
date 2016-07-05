import * as _ from 'lodash';
import {
  navigateTo,
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE_TO,
} from '@shoutem/core/navigation';

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

let activeLayouts = [];

function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    const actionName = _.get(action, 'shortcut.attributes.action');
    const screenName = _.get(action, 'shortcut.attributes.screen');
    const layouts = _.get(action, 'shortcut.attributes.screens');

    activeLayouts = layouts;

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

function selectScreenLayout() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    if (action.type === NAVIGATE_TO) {
      const screenLayout = _.find(activeLayouts, { canonicalType: action.route.screen });
      if (screenLayout) {
        const newAction = _.merge(action, {
          route: {
            screen: screenLayout.canonicalName,
            props: { ...screenLayout.settings },
            context: {
              layouts: activeLayouts,
            },
          },
        });

        return next(newAction);
      }
    }

    if (action.type !== NAVIGATION_ACTION_PERFORMED && _.isArray(action.navigationStack)) {
      const navigationStack = action.navigationStack;
      const lastRoute = navigationStack[navigationStack.length - 1];
      const layouts = _.get(lastRoute, 'context.layouts');
      activeLayouts = layouts;
    }

    return next(action);
  };
}

export {
  selectScreenLayout,
  createExecuteShortcutMiddleware,
};
