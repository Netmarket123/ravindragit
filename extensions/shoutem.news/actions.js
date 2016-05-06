import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from 'redux-api-state';

export const SHOUTEM_NEWS_SCHEME = 'shoutem.news.articles';
export const SHOUTEM_IMAGES_SCHEME = 'shoutem.core.image-attachments';

export const reducers = {
  news: storage('shoutem.news.articles'),
  newsImages: storage('shoutem.core.image-attachments'),
  latestNews: collection('shoutem.news.articles', 'latestNews'),
  searchedNews: collection('shoutem.news.articles', 'searchedNews'),
};

export function openListScreen(settings = { photoCentric: true }) {
  const nextScreenName = `shoutem.news.${settings.photoCentric ? 'GridScreen' : 'ListScreen'}`;

  const route = {
    screen: nextScreenName,
    props: {},
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
      endpoint: `http://api.shoutem.local/v1/apps/5734177/resources/${SHOUTEM_NEWS_SCHEME}?` +
      `include=image${query}`,
      headers: { 'Content-Type': 'application/json' },
    },
    SHOUTEM_NEWS_SCHEME,
    collectionName
  );
}
