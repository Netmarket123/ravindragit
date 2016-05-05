import GannettListScreen from './screens/GanetListScreen';
import GannettDetailsScreen from './screens/GannettDetailsScreen';
import customTheme from './mocks/theme';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { openListScreen, reducers, findNews } from './actions';
import { apiStateMiddleware } from 'redux-api-state';

const SHOUTEM_NEWS_EXT_NAME = 'shoutem.news';
const reducer = combineReducers({ ...reducers });

export const actions = {
  openListScreen,
  findNews,
};

export {
  GannettListScreen,
  GannettDetailsScreen,
  customTheme as mockedTheme,
  reducer,
  SHOUTEM_NEWS_EXT_NAME,
};

export const screens = {
  GannettDetailsScreen,
  GannettListScreen,
};


export const middleware = [thunk, apiMiddleware, apiStateMiddleware];
