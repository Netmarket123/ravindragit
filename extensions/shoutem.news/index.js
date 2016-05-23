import ArticlesGridScreen from './screens/ArticlesGridScreen';
import ArticleDetailsScreen from './screens/ArticleDetailsScreen';
import ArticlesListScreen from './screens/ArticlesListScreen';
import reducer, { openListScreen, findNews } from './actions';

const actions = {
  openListScreen,
  findNews,
};

const screens = {
  ArticlesListScreen,
  ArticlesGridScreen,
  ArticleDetailsScreen,
};

export {
  reducer,
  actions,
  screens,
};
