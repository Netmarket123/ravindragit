import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from '@shoutem/redux-api-state';
import {
  DataSchemas,
  Screens,
} from './const.js';

export const reducers = {
  news: storage(DataSchemas.Articles),
  categories: storage(DataSchemas.Categories),
  newsImages: storage(DataSchemas.Images),
  newsCategories: collection(DataSchemas.Categories, 'newsCategories'),
  latestNews: collection(DataSchemas.Articles, 'latestNews'),
  searchedNews: collection(DataSchemas.Articles, 'searchedNews'),
};

export function openListScreen(settings = {
  textCentric: false,
}) {
  const nextScreenName = settings.textCentric ?
    Screens.ArticlesListScreen : Screens.ArticlesGridScreen;

  const route = {
    screen: nextScreenName,
    props: {
      settings: {
        appId: settings.appId || '2056',
        endpoint: settings.endpoint || 'http://api.dev.sauros.hr',
        parentCategoryId: settings.parentCategoryId || '49',
      },
    },
  };

  return navigateTo(route);
}

export function findNews(searchTerm, category, pageOffset = 0, settings) {
  let query = '';
  let collectionName = 'latestNews';
  const offset = `&page[offset]=${pageOffset}`;

  if (searchTerm) {
    query += `&query=${searchTerm}`;
    collectionName = 'searchedNews';
  }

  if (category) {
    query += `&filter[categories]=${category.id}`;
  }

  return find(
    {
      // TODO(Braco) - use appID dynamically (the right way)
      endpoint:
        `${settings.endpoint}/v1/apps/${settings.appId}/resources/${DataSchemas.Articles}?` +
        `include=image${query}${offset}&page[limit]=8`,
      headers: { 'Content-Type': 'application/json' },
    },
    DataSchemas.Articles,
    collectionName
  );
}

export function getNewsCategories(parent = 'null', settings) {
  return find(
    {
      // TODO(Braco) - use appID dynamically (the right way)
      endpoint: `${settings.endpoint}/v1/apps/${settings.appId}/categories` +
      `?filter[parent]=${parent}&filter[schema]=${DataSchemas.Articles}`,
      headers: { 'Content-Type': 'application/json' },
    },
    DataSchemas.Categories,
    'newsCategories'
  );
}
