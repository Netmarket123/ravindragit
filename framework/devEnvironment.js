export default {

  /**
   * Returns middleware that should be used only in development
   * mode. This usually includes utilities to simplify debugging.
   * @returns {Array} Redux middleware.
   */
  getReduxMiddleware() {
    const middleware = [];

    const createLogger = require('redux-logger');
    const logger = createLogger({
      collapsed: true,
    });
    middleware.push(logger);

    return middleware;
  },
};
