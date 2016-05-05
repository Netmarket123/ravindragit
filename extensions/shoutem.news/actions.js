import {
  navigateTo,
} from 'shoutem/navigation';
import { storage, collection } from 'redux-api-state';
import { find } from 'redux-api-state';

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

export function findNews(searchTerm) {
  let query = '';
  let collectionName = 'latestNews';

  if (searchTerm) {
    query = `&query=${searchTerm}`;
    collectionName = 'searchedNews';
  }

  return find(
    {
      endpoint: `http://api.aperfector.com/v1/apps/1113/resources/${SHOUTEM_NEWS_SCHEME}?` +
      `include=image${query}`,
      headers: { 'Content-Type': 'application/json' },
    },
    SHOUTEM_NEWS_SCHEME,
    collectionName
  );
};
