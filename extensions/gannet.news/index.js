import GannettListScreen from './screens/GanetListScreen';
import GannettDetailsScreen from './screens/GannettDetailsScreen';
import customTheme from './mocks/theme';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { openListScreen, reducers } from './actions';
import { jsonApiMiddleware } from 'redux-json-api';

const reducer = combineReducers({ ...reducers });

export const actions = {
  openListScreen,
};

export {
  GannettListScreen,
  GannettDetailsScreen,
  customTheme as mockedTheme,
  reducer,
};

export const screens = {
  GannettDetailsScreen,
  GannettListScreen,
};


export const middleware = [thunk, apiMiddleware, jsonApiMiddleware];
