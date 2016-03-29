import Denormalizer from './Denormalizer';

export default function createOpenHomeScreenAction(navigateTo) {
  return (settings, state) => {
    const homeScreen = settings.homeScreen;
    const children = settings.homeScreen.children;

    const denormalizer = new Denormalizer(state);
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
