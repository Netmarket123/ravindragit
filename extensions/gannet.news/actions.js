import {
  navigateTo,
} from 'shoutem/navigation';
import { storage, collection } from 'redux-api-state';

export const reducers = {
  news: storage('shoutem.news.articles'),
  newsImages: storage('shoutem.core.image-attachments'),
  latestNews: collection('shoutem.news.articles', 'latestNews'),
  searchedNews: collection('shoutem.news.articles', 'searchedNews'),
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

