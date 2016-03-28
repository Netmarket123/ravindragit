import configuration from './configuration';
import { combineReducers } from 'redux';
import configurationReducerCreator, {
  setConfiguration,
  updateConfiguration,
} from './actions';

const ID = 'shoutem.application';

// create reducer with wanted default configuration
const reducer = combineReducers({
  configuration: configurationReducerCreator(configuration),
});

export {
  ID,
  configuration,
  setConfiguration,
  updateConfiguration,
  reducer,
};
