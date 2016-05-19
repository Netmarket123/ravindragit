import ArticlesGridScreen from './screens/ArticlesGridScreen';
import ArticleDetailsScreen from './screens/ArticleDetailsScreen';
import ArticlesListScreen from './screens/ArticlesListScreen';
import { combineReducers } from 'redux';
import { openListScreen, reducers, findNews } from './actions';

export const reducer = combineReducers({ ...reducers });

export const actions = {
  openListScreen,
  findNews,
};

export const screens = {
  ArticlesListScreen,
  ArticlesGridScreen,
  ArticleDetailsScreen,
};

