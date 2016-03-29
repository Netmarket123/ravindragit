export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    if (!action.shortcut || !action.shortcut.action) {
      return next(action);
    }

    const shortcutAction = actions[action.shortcut.action];

    if (typeof shortcutAction === 'function') {
      return next(shortcutAction(action.shortcut.settings, store.getState()));
    }

    throw new Error(`Shortcut you tried to execute has no valid action (${action.shortcut.action}),
  or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
  };
}
