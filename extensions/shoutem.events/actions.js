import {
  navigateTo,
} from 'shoutem/navigation';
import { find, storage, collection } from '@shoutem/redux-api-state';

export const SHOUTEM_EVENTS_SCHEME = 'shoutem.events.events';
export const SHOUTEM_IMAGES_SCHEME = 'shoutem.core.image-attachments';
export const SHOUTEM_CATEGORIES_SCHEME = 'shoutem.core.categories';
export const CATEGORY_SELECTED = Symbol('categorySelected');

export const schemasMap = {
  [SHOUTEM_EVENTS_SCHEME]: ['shoutem.events', 'events'],
  [SHOUTEM_IMAGES_SCHEME]: ['shoutem.events', 'eventsImages'],
  'shoutem.core.applications': ['shoutem.events', 'applications'],
  'shoutem.core.categories': ['shoutem.events', 'categories'],
};

export const reducers = {
  events: storage(SHOUTEM_EVENTS_SCHEME),
  categories: storage(SHOUTEM_CATEGORIES_SCHEME),
  eventsImages: storage(SHOUTEM_IMAGES_SCHEME),
  eventsCategories: collection(SHOUTEM_CATEGORIES_SCHEME, 'eventsCategories'),
  latestEvents: collection(SHOUTEM_EVENTS_SCHEME, 'latestEvents'),
};

export function openListScreen(settings) {
  const nextScreenName = 'shoutem.events.ListScreen';

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

export function findEvents(categoryIds, settings) {
  let query = '';
  const collectionName = 'latestEvents';

  if (categoryIds && categoryIds.length > 0) {
    query += `&filter[categories]=${categoryIds.join(',')}`;
  }

  return find(
    {
      endpoint: `${settings.endpoint}/v1/apps/${settings.appId}/resources/${SHOUTEM_EVENTS_SCHEME}?include=image${query}`,
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
