/**
 * Creates a function which calls a provided navigateTo function
 * with a route containing the Home Screen props
 *
 * @param navigateTo
 * @returns {*} OpenHomeScreenAction
 */
export default function createOpenHomeScreenAction(navigateTo) {
  /**
   * Generates a route for given settings and children.
   * A route contains screen name, homeScreen settings
   * and shortcuts.
   *
   * @returns {*} - a navigateTo action with homeScreen route
   */
  return (settings, children) => {
    const homeScreen = settings.homeScreen;

    const route = {
      screen: 'shoutem.homescreen.HomeScreen',
      props: {
        settings: homeScreen,
        shortcuts: children,
      },
    };

    return navigateTo(route);
  };
}
