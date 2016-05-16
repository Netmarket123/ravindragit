import GridScreen from './screens/GridScreen';
import DetailsScreen from './screens/DetailsScreen';
import ListScreen from './screens/ListScreen';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { openListScreen, reducers, findNews } from './actions';
import { apiStateMiddleware } from '@shoutem/redux-api-state';

const SHOUTEM_NEWS_EXT_NAME = 'shoutem.news';
const reducer = combineReducers({ ...reducers });

export const actions = {
  openListScreen,
  findNews,
};

export {
  reducer,
  SHOUTEM_NEWS_EXT_NAME,
};

export const screens = {
  ListScreen,
  GridScreen,
  DetailsScreen,
};

export const middleware = [thunk, apiMiddleware, apiStateMiddleware];
