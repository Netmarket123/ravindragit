import Denormalizer from './Denormalizer';

export default function createOpenHomeScreenAction(navigateTo) {
  return (settings, children, state) => {
    const homeScreen = settings.homeScreen;
    const denormalizer = new Denormalizer(state['shoutem.application'].configuration.included);
    const shortcuts = children.map(denormalizer.getDenormalizedItem);

    const route = {
      screen: 'shoutem.homeScreen.HomeScreen',
      props: {
        settings: homeScreen,
        shortcuts,
      },
    };

    navigateTo(route);
  };
}
