export function getFirstShortcut(configuration) {
  const firstShortcutItem = configuration.navigation[0];
  
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
