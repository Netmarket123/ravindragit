import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from '@shoutem/redux-api-state';

export const SHOUTEM_EVENTS_SCHEME = 'shoutem.events.events';
export const SHOUTEM_IMAGES_SCHEME = 'shoutem.core.image-attachments';
export const SHOUTEM_CATEGORIES_SCHEME = 'shoutem.core.categories';
export const CATEGORY_SELECTED = Symbol('categorySelected');

export const reducers = {
  events: storage(SHOUTEM_EVENTS_SCHEME),
  categories: storage(SHOUTEM_CATEGORIES_SCHEME),
  eventsImages: storage(SHOUTEM_IMAGES_SCHEME),
  eventsCategories: collection(SHOUTEM_CATEGORIES_SCHEME, 'eventsCategories'),
  latestEvents: collection(SHOUTEM_EVENTS_SCHEME, 'latestEvents'),
};

export function openListScreen(settings = {
  textCentric: false,
}) {
  const nextScreenName = `shoutem.events.${settings.textCentric ? 'GridScreen' : 'ListScreen'}`;

  const route = {
    screen: nextScreenName,
    props: {
      settings: {
        appId: settings.appId || '2047',
        endpoint: settings.endpoint || 'http://api.dev.sauros.hr',
        parentCategoryId: settings.parentCategoryId || '2251460',
      },
    },
  };

  return navigateTo(route);
}

export function findEvents(category, settings) {
  let query = '';
  const collectionName = 'latestEvents';

  if (category) {
    query += `&filter[categories]=${category.id}`;
  }

  return find(
    {
      endpoint: `${settings.endpoint}/v1/apps/${settings.appId}/resources/${SHOUTEM_EVENTS_SCHEME}?include=image`,
      headers: { 'Content-Type': 'application/json' },
    },
    SHOUTEM_EVENTS_SCHEME,
    collectionName
  );
}

export function getEventsCategories(parent = 'null', settings) {
  return find(
    {
      endpoint: `${settings.endpoint}/v1/apps/${settings.appId}/categories` +
      `?filter[schema]=${SHOUTEM_EVENTS_SCHEME}`,
      headers: { 'Content-Type': 'application/json' },
    },
    SHOUTEM_CATEGORIES_SCHEME,
    'eventsCategories'
  );
}
