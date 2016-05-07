import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from 'redux-api-state';

export const SHOUTEM_NEWS_SCHEME = 'shoutem.news.articles';
export const SHOUTEM_IMAGES_SCHEME = 'shoutem.core.image-attachments';
export const SHOUTEM_CATEGORIES_SCHEME = 'shoutem.core.categories';
export const CATEGORY_SELECTED = Symbol('categorySelected');

export const reducers = {
  news: storage(SHOUTEM_NEWS_SCHEME),
  categories: storage(SHOUTEM_CATEGORIES_SCHEME),
  newsImages: storage(SHOUTEM_IMAGES_SCHEME),
  newsCategories: collection(SHOUTEM_CATEGORIES_SCHEME, 'newsCategories'),
  latestNews: collection(SHOUTEM_NEWS_SCHEME, 'latestNews'),
  searchedNews: collection(SHOUTEM_NEWS_SCHEME, 'searchedNews'),
};

export function openListScreen(settings = { photoCentric: true }) {
  const nextScreenName = `shoutem.news.${settings.photoCentric ? 'GridScreen' : 'ListScreen'}`;

  const route = {
    screen: nextScreenName,
    props: {},
  };

  return navigateTo(route);
}

export function findNews(searchTerm, category) {
  let query = '';
  let collectionName = 'latestNews';

  if (searchTerm) {
    query += `&query=${searchTerm}`;
  }

  if (category && category.id) {
    query += `&filter[categories]=${category.id}`;
  }

  if (query) {
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

export function getNewsCategories(parent = 'null') {
  return find(
    {
      endpoint: 'http://api.shoutem.local/v1/apps/5734177/categories' +
      `?filter[parent]=${parent}&filter[schema]=${SHOUTEM_NEWS_SCHEME}`,
      headers: { 'Content-Type': 'application/json' },
    },
    SHOUTEM_CATEGORIES_SCHEME,
    'newsCategories'
  );
}
