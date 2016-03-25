import Denormalizer from './Denormalizer';

export default function createOpenHomeScreenAction(navigateTo) {
  return (settings, state) => {
    const layout = settings.homeScreen.layout;
    const children = settings.homeScreen.children;
    const childrenIds = children.map(child => child.id);
    const shortcutDescriptors = state.filter(shortcut => childrenIds.indexOf(shortcut.id) > -1);

    const denormalizer = new Denormalizer(state);
    const shortcuts = shortcutDescriptors.map(denormalizer.getDenormalizedItem.bind(denormalizer));

    navigateTo({ screen: 'shoutem.homeScreen.HomeScreen', props: { layout, shortcuts } });
  };
}
