import GridScreen from './screens/GridScreen';
import DetailsScreen from './screens/DetailsScreen';
import ListScreen from './screens/ListScreen';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { openListScreen, reducers, findEvents } from './actions';
import { apiStateMiddleware } from '@shoutem/redux-api-state';

const SHOUTEM_EVENTS_EXT_NAME = 'shoutem.events';
const reducer = combineReducers({ ...reducers });

export const actions = {
  openListScreen,
  findEvents,
};

export {
  reducer,
  SHOUTEM_EVENTS_EXT_NAME,
};

export const screens = {
  ListScreen,
  GridScreen,
  DetailsScreen,
};

export const middleware = [thunk, apiMiddleware, apiStateMiddleware];
