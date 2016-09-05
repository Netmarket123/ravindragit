import * as _ from 'lodash';
import * as navigation from '@shoutem/core/navigation';
const {
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE,
} = navigation;
import { EXECUTE_SHORTCUT } from './actions';

/**
 * Creates screen settings for given shortcut.
 * Combines settings with other needed shortcut attributes.
 *
 * @param shortcut {{}}
 * @returns {{title: *}}
 */
function createScreenSettings(shortcut) {
  const attributes = _.get(shortcut, 'attributes', {});
  return {
    title: attributes.title || '',
    ...attributes.settings,
  };
}

function getChildShortcuts(store, parentShortcut) {
  const childrenDescriptors = _.get(parentShortcut, 'relationships.children.data', []);
  const shortcuts = _.get(store.getState(), ['shoutem.application', 'shortcuts']);

  return childrenDescriptors.map(child => shortcuts[child.id]);
}

let activeLayouts = [];

function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    if (action.type === EXECUTE_SHORTCUT) {
      const actionName = _.get(action, 'shortcut.attributes.action');

      if (!actionName) {
        return next(action);
      }

      if (actionName) {
        const shortcutAction = actions[actionName];
        const settings = createScreenSettings(action.shortcut);
        const children = getChildShortcuts(store, action.shortcut);

        if (typeof shortcutAction === 'function') {
          return next(shortcutAction(settings, children, store.getState()));
        }

        throw new Error(`Shortcut you tried to execute has no valid action (${actionName}),
      or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
      }
    }

    return next(action);
  };
}

// eslint-disable-next-line no-unused-vars
const selectScreenLayout = store => next => action => {
  // Sometimes navigate actions doesn't have route.
  // This is case when we are navigate to some route in stack
  // i.e. popToTop navigates to 1st route in stack (route is taken from stack)
  if (action.type === NAVIGATE && action.route) {
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

  return next(action);
};

// eslint-disable-next-line no-unused-vars
const navigateToShortcutScreen = store => next => action => {
  if (action.type === EXECUTE_SHORTCUT) {
    const screenName = _.get(action, 'shortcut.attributes.screen');
    const settings = createScreenSettings(action.shortcut);
    const children = getChildShortcuts(store, action.shortcut);
    const navigateAction = navigation[action.navigationAction];

    activeLayouts = _.get(action, 'shortcut.attributes.screens');

    if (screenName) {
      if (!navigateAction) {
        throw Error('Shortcut you are trying to execute doesn\'t have proper navigation action.' +
          ' Please, check your extension.json or call of executeShortcut action creator.');
      }

      const openScreenAction = () =>
        navigateAction({
          screen: screenName,
          props: {
            children,
            ...settings,
          },
          context: {
            layouts: activeLayouts,
          },
        });

      // No need for error handling, if screen is invalid navigate to will throw Exception
      return next(openScreenAction());
    }
  }

  return next(action);
};

// eslint-disable-next-line no-unused-vars
const setActiveLayouts = store => next => action => {
  if (action.type === NAVIGATION_ACTION_PERFORMED && _.isArray(action.navigationStack)) {
    const navigationStack = action.navigationStack;
    const lastRoute = navigationStack[navigationStack.length - 1];
    activeLayouts = _.get(lastRoute, 'context.layouts');
  }

  return next(action);
};

export {
  setActiveLayouts,
  selectScreenLayout,
  navigateToShortcutScreen,
  createExecuteShortcutMiddleware,
};
