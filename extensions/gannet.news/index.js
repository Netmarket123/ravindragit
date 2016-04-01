import GannettListScreen from './screens/GanetListScreen';
import GannettDetailsScreen from './screens/GannettDetailsScreen';
import gannettItems from './mocks/ganetItems';
import customTheme from './mocks/theme';
import { jsonApiMiddleware, storage, collection } from 'redux-json-api';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  news: storage('gannett.news'),
  latestNews: collection('gannett.news', 'latestNews', []),
});

export {
  GannettListScreen,
  GannettDetailsScreen,
  gannettItems as mockedItems,
  customTheme as mockedTheme,
  reducer,
};

export const screens = {
  GannettDetailsScreen,
  GannettListScreen,
};


export const middleware = [thunk, apiMiddleware, jsonApiMiddleware];
