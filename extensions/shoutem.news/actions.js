import {
  navigateTo,
} from 'shoutem/navigation';
import { combineReducers } from 'redux';
import { find, storage, collection } from '@shoutem/redux-api-state';
import _ from 'lodash';
import {
  DataSchemas,
  Screens,
  Collections,
} from './const.js';

const reducers = {
  news: storage(DataSchemas.Articles),
  categories: storage(DataSchemas.Categories),
  newsImages: storage(DataSchemas.Images),
  newsCategories: collection(DataSchemas.Categories, Collections.NewsCategories),
  latestNews: collection(DataSchemas.Articles, Collections.LatestNews),
};
export default combineReducers(reducers);

// Redux api state denormalizer storage to schema map
export const schemasMap = {
  [DataSchemas.Articles]: '["shoutem.news"].news',
  [DataSchemas.Images]: '["shoutem.news"].newsImages',
  'shoutem.core.applications': '["shoutem.news"].applications',
  [DataSchemas.Categories]: '["shoutem.news"].categories',
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
  return createEndpoint(settings, 'categories') + createQueryString(options);
}

export const openListScreen = (settings) => {
  const nextScreenName = settings.textCentric ?
    Screens.ArticlesListScreen : Screens.ArticlesGridScreen;

  const route = {
    screen: nextScreenName,
    props: {
      settings,
    },
  };

  return navigateTo(route);
};

/**
 *
 * @param categoryIds {string}
 * @param settings {{}}
 * @returns {*}
 */
export const findNews = (categoryIds, settings) => {
  const options = {
    include: 'image',
    page: {
      limit: 10,
      offset: 0,
    },
  };
  if (categoryIds && categoryIds.length > 0) {
    options.filter = {
      categories: categoryIds.join(','),
    };
  }
  return find(
    {
      endpoint: getResourceUrl(DataSchemas.Articles, options, settings),
      headers: { 'Content-Type': 'application/json' },
    },
    DataSchemas.Articles,
    Collections.LatestNews
  );
};

export const getNewsCategories = (parent, settings) => {
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
    Collections.NewsCategories
  );
};
