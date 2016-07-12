import coreReducer from './coreReducer';
import devEnvironment from './devEnvironment';
import { blockActionsMiddleware } from './coreMiddleware';

export default {
  'shoutem.core': {
    reducer: coreReducer,
    middleware: [
      ...devEnvironment.getReduxMiddleware(),
      blockActionsMiddleware(),
    ],
  },
};
