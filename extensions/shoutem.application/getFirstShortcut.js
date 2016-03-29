export function getFirstShortcut(configuration) {
  const firstShortcut = configuration.data.relationships.navigation.data.find(navigationItem =>
    navigationItem.type === 'shoutem.core.shortcuts'
  );

  return configuration.included.find(item =>
    item.type === firstShortcut.type && item.id === firstShortcut.id
  );
}
