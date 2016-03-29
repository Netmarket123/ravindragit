import coreReducer from './coreReducer';
import devEnvironment from './devEnvironment';

export default {
  'shoutem.core': {
    reducer: coreReducer,
    middleware: devEnvironment.getReduxMiddleware(),
  },
};
