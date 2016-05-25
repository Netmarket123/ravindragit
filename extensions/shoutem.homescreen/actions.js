import * as _ from 'lodash';
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
  return (settings, children, state) => {
    const homeScreen = settings.homeScreen;
    // TODO(Vladimir) - use ArrayDenormalizer
    const shortcuts = children.map((child) => (
      _.get(state, `['shoutem.application'].shortcuts[${child.id}]`)
    ));

    const route = {
      screen: 'shoutem.homescreen.HomeScreen',
      props: {
        settings: homeScreen,
        shortcuts,
      },
    };

    return navigateTo(route);
  };
}
