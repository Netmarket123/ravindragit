import {
  Navigator,
} from 'react-native';

import {
  navigateTo,
} from 'shoutem/navigation';

import gannettItems from './mocks/ganetItems';

export function openExampleScreen(settings) {
  const route = {
    screen: `gannet.news.GannettListScreen`,
    props: {
      items: gannettItems,
    },
  };

  return navigateTo(route);
}
