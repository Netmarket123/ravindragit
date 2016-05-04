import { SHOUTEM_NEWS_SCHEME } from '../../actions';
import { find } from 'redux-api-state';

export default (searchTerm) => {
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
