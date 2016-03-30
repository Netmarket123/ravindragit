import Denormalizer from './Denormalizer';

/**
 * Creates a function which calls a provided navigateTo function
 * with a route containing the Home Screen props
 *
 * @param navigateTo
 * @returns {*} OpenHomeScreenAction
 */
export default function createOpenHomeScreenAction(navigateTo) {
  /**
   * Generates a route for given settings, children and state
   * containing, screen name, homeScreen settings and denormalized
   * shortcuts obtained from state for given children ids.
   *
   * @returns {*} - a navigateTo action with homeScreen route
   */
  return (settings, children, state) => {
    const homeScreen = settings.homeScreen;
    const denormalizer = new Denormalizer(state['shoutem.application'].configuration.included);
    const shortcuts = children.map(denormalizer.getDenormalizedItem);

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
