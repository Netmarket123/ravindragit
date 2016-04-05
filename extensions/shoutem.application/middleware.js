export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    if (!action.shortcut || !action.shortcut.action) {
      return next(action);
    }

    const { settings, children } = action.shortcut;
    const actionName = action.shortcut.action;
    const shortcutAction = actions[actionName];

    if (typeof shortcutAction === 'function') {
      return next(shortcutAction(settings, children, store.getState()));
    }

    throw new Error(`Shortcut you tried to execute has no valid action (${actionName}),
  or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
  };
}
