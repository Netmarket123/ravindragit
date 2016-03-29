import Denormalizer from './Denormalizer';

export default function createOpenHomeScreenAction(navigateTo) {
  return (settings, state) => {
    const layout = settings.homeScreen.layout;
    const children = settings.homeScreen.children;

    const denormalizer = new Denormalizer(state);
    const shortcuts = children.map(denormalizer.getDenormalizedItem);

    navigateTo({ screen: 'shoutem.homeScreen.HomeScreen', props: { layout, shortcuts } });
  };
}
