export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

export function executeShortcut(shortcut) {
  return {
    type: EXECUTE_SHORTCUT,
    shortcut,
  };
}
