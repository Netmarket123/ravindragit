import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from '@shoutem/redux-api-state';
import _ from 'lodash';
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

/**
 * Parse query object to JSON query string
 *
 * @param queryObject
 * @param parentFieldName
 * @returns {string|*}
 */
function parseQueryObject(queryObject, parentFieldName) {
  return _.reduce(queryObject, (queryParams, fieldValue, fieldName) => {
    let queryParam;
    if (_.isPlainObject(fieldValue)) {
      const newFieldName = parentFieldName ? `${parentFieldName}[${fieldName}]` : fieldName;
      queryParam = parseQueryObject(fieldValue, newFieldName);
    } else if (parentFieldName) {
      queryParam = [`${parentFieldName}[${fieldName}]=${fieldValue}`];
    } else {
      queryParam = [`${fieldName}=${fieldValue}`];
    }
    return queryParams.concat(queryParam);
  }, [])
    .join('&');
}

function createQueryString(options) {
  return `?${parseQueryObject(options)}`;
}

function createEndpoint(settings, path) {
  return `${settings.endpoint}/v1/apps/${settings.appId}/${path}`;
}

function getResourceUrl(schema, options = {}, settings) {
  const endpoint = createEndpoint(settings, `resources/${schema}`);
  const queryString = createQueryString(options);

  return endpoint + queryString;
}

function getCategoryUrl(options, settings) {
  return createEndpoint(settings, 'categories') + parseQueryObject(options, '?');
}

export function openListScreen(settings = {
  textCentric: false,
}) {
  const nextScreenName = settings.textCentric ?
    Screens.ArticlesListScreen : Screens.ArticlesGridScreen;

  const route = {
    screen: nextScreenName,
    props: {
      settings: {
        appId: settings.appId,
        endpoint: settings.endpoint,
        parentCategoryId: settings.parentCategoryId,
      },
    },
  };

  return navigateTo(route);
}

export function findNews(searchTerm, category, pageOffset = 0, settings) {
  const collectionName = searchTerm ? 'searchedNews' : 'latestNews';
  const options = {
    include: 'image',
    page: {
      limit: 10,
      offset: pageOffset,
    },
  };
  if (searchTerm) {
    options.query = searchTerm;
  }
  if (category) {
    options.filter = {
      categories: category.id,
    };
  }
  return find(
    {
      endpoint: getResourceUrl(DataSchemas.Articles, options, settings),
      headers: { 'Content-Type': 'application/json' },
    },
    DataSchemas.Articles,
    collectionName
  );
}

export function getNewsCategories(parent = 'null', settings) {
  const options = {
    filter: {
      parent,
      schema: DataSchemas.Articles,
    },
  };
  return find(
    {
      endpoint: getCategoryUrl(options, settings),
      headers: { 'Content-Type': 'application/json' },
    },
    DataSchemas.Categories,
    'newsCategories' // collection
  );
}
