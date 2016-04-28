import {
  navigateTo,
} from 'shoutem/navigation';
import { storage, collection } from 'redux-api-state';

export const reducers = {
  news: storage('gannett.news'),
  latestNews: collection('gannett.news', 'latestNews'),
  searchedNews: collection('gannett.news', 'searchedNews'),
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

