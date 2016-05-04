import {
  navigateTo,
} from 'shoutem/navigation';
import { storage, collection } from 'redux-api-state';

export const SHOUTEM_NEWS_SCHEME = 'shoutem.news.articles';

export const reducers = {
  news: storage('shoutem.news.articles'),
  newsImages: storage('shoutem.core.image-attachments'),
  latestNews: collection('shoutem.news.articles', 'latestNews'),
  searchedNews: collection('shoutem.news.articles', 'searchedNews'),
};


export function openListScreen() {
  const nextScreenName = 'shoutem.news.ListScreen';

  const route = {
    screen: nextScreenName,
    props: {
      message: 'Screen: Shoutem News',
    },
  };

  return navigateTo(route);
}

