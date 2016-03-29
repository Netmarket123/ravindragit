export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    if (!action.shortcut || !action.shortcut.attributes.action) {
      return next(action);
    }

    const { attributes, relationships } = action.shortcut;
    const shortcutAction = actions[attributes.action];

    if (typeof shortcutAction === 'function') {
      return next(shortcutAction(attributes.settings, relationships.children, store.getState()));
    }

    throw new Error(`Shortcut you tried to execute has no valid action (${attributes.action}),
  or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
  };
}
