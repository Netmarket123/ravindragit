import {
  navigateTo,
} from 'shoutem/navigation';

export function openExampleScreen(settings) {
  const { screen, modal } = settings;
  const nextScreenName = `shoutem.test.screen${screen}`;

  let route = {
    screen: nextScreenName,
    props: {
      message: `Screen: ${screen}`,
    },
  };

  if (modal) {
    route = Object.assign(route, {
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  return navigateTo(route);
}
