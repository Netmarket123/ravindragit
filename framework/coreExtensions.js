import coreReducer from './coreReducer';
import devEnvironment from './devEnvironment';

let middleware = undefined;

if (process.env.NODE_ENV === 'development') {
  middleware = middleware.concat(devEnvironment.getReduxMiddleware());
}

export default {
  'shoutem.core': {
    reducer: coreReducer,
    middleware,
  },
};
