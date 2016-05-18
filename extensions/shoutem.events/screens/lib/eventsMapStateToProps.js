import { ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { SHOUTEM_EVENTS_EXT_NAME } from '../../index';
import {
  SHOUTEM_EVENTS_SCHEME,
  SHOUTEM_IMAGES_SCHEME,
  SHOUTEM_CATEGORIES_SCHEME,
} from '../../actions';

const schemasMap = {
  [SHOUTEM_EVENTS_SCHEME]: ['shoutem.events', 'events'],
  [SHOUTEM_IMAGES_SCHEME]: ['shoutem.events', 'eventsImages'],
  'shoutem.core.applications': ['shoutem.events', 'applications'],
  'shoutem.core.categories': ['shoutem.events', 'categories'],
};

export default (state) => {
  const denormalizer = new ReduxApiStateDenormalizer(() => state, schemasMap);
  return {
    events: denormalizer.denormalizeCollection(
      state[SHOUTEM_EVENTS_EXT_NAME].latestEvents, SHOUTEM_EVENTS_SCHEME
    ),
    searchedEvents: denormalizer.denormalizeCollection(
      state[SHOUTEM_EVENTS_EXT_NAME].searchedEvents, SHOUTEM_EVENTS_SCHEME
    ),
    selectedCategory: state[SHOUTEM_EVENTS_EXT_NAME].selectedCategory,
    categories: denormalizer.denormalizeCollection(
      state[SHOUTEM_EVENTS_EXT_NAME].eventsCategories,
      SHOUTEM_CATEGORIES_SCHEME,
      { [SHOUTEM_CATEGORIES_SCHEME]: state[SHOUTEM_EVENTS_EXT_NAME].categories }
    ),
  };
};
