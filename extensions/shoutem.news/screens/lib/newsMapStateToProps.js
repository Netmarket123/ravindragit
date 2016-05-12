import { ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { SHOUTEM_NEWS_EXT_NAME } from '../../index';
import { SHOUTEM_NEWS_SCHEME, SHOUTEM_IMAGES_SCHEME } from '../../actions';

const schemasMap = {
  [SHOUTEM_NEWS_SCHEME]: '["shoutem.news"]news',
  [SHOUTEM_IMAGES_SCHEME]: '["shoutem.news"]newsImages',
  'shoutem.core.applications': '["shoutem.news"]applications',
  'shoutem.core.categories': '["shoutem.news"]categories',
};

export default (state) => {
  const denormalizer = new ReduxApiStateDenormalizer(() => state, schemasMap);
  return {
    news: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].latestNews, SHOUTEM_NEWS_SCHEME
    ),
    searchedNews: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].searchedNews, SHOUTEM_NEWS_SCHEME
    ),
    selectedCategory: state[SHOUTEM_NEWS_EXT_NAME].selectedCategory,
  };
};
