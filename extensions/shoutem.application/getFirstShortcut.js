export function getFirstShortcut(configuration) {
  // TODO(Ivan): Change this function when configuration will be saved denormalized
  const firstShortcut = configuration.data.relationships.navigation.data.find(navigationItem =>
    navigationItem.type === 'shoutem.core.shortcuts'
  );

  const firstShortcutItem = configuration.included.find(item =>
    item.type === firstShortcut.type && item.id === firstShortcut.id
  );
  let children = [];
  if (firstShortcutItem.relationships) {
    children = firstShortcutItem.relationships.children ?
      firstShortcutItem.relationships.children.data : [];
  }

  return {
    ...firstShortcutItem.attributes,
    children,
  };
}
