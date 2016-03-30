export function getFirstShortcut(configuration) {
  const firstShortcut = configuration.data.relationships.navigation.data.find(navigationItem =>
    navigationItem.type === 'shoutem.core.shortcuts'
  );

  const firstShortcutItem = configuration.included.find(item =>
    item.type === firstShortcut.type && item.id === firstShortcut.id
  );

  return {
    ...firstShortcutItem.attributes,
    children: firstShortcutItem.relationships.children.data,
  };
}
