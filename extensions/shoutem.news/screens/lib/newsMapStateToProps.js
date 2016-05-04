import getNewsFromState from './getNewsFromState';
import { SHOUTEM_NEWS_EXT_NAME } from '../../index';

export default (state) => ({
  news: getNewsFromState(state),
  images: state[SHOUTEM_NEWS_EXT_NAME].newsImages,
  searchedNews: getNewsFromState(state, 'searchedNews'),
});
