import {
  navigateTo,
} from 'shoutem/navigation';
import { storage, collection } from 'redux-api-state';

export const reducers = {
  news: storage('gannett.news'),
  latestNews: collection('gannett.news', 'latestNews'),
};

export function openListScreen() {
  const nextScreenName = 'gannet.news.GannettListScreen';

  const route = {
    screen: nextScreenName,
    props: {
      message: 'Screen: GannettListScreen',
    },
  };

  return navigateTo(route);
}

