import _ from 'lodash';
import EventEmitter from 'events';
import { getConfiguration } from '../redux';

let activeConfiguration;

const CONFIGURATION_CHANGE = 'configurationChanged';

function watchConfiguration(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const state = store.getState();
    const configuration = getConfiguration(state);
    if (!_.isEmpty(configuration) && configuration !== activeConfiguration) {
      activeConfiguration = configuration;
      onChange(activeConfiguration);
    }
  });
}


/**
 * Configuration event emitter.
 * Should be used only within application lifecycle methods.
 * Enables partial listener ordering, you can prepend or append event into listeners stack.
 * Optimize store subscriptions for configuration watch.
 */
class ConfigurationEvent extends EventEmitter {
  init(app) {
    watchConfiguration(app, configuration => this.emit(CONFIGURATION_CHANGE, configuration));
  }

  /**
   * Prepend listener implementation for nodejs EventEmitter.prependListener, not implement in RN.
   * https://nodejs.org/api/events.html#events_emitter_prependlistener_eventname_listener
   *
   * @param type
   * @param firstListener
   * @returns {*}
   */
  prependListener(firstListener) {
    const oldListeners = [...this.listeners(CONFIGURATION_CHANGE)];

    this.removeAllListeners(CONFIGURATION_CHANGE);

    const subscription = this.on(CONFIGURATION_CHANGE, firstListener);
    oldListeners.forEach(listener => this.on(CONFIGURATION_CHANGE, listener));

    return subscription;
  }

  addListener(listener) {
    return this.on(CONFIGURATION_CHANGE, listener);
  }
}

export const configurationEvent = new ConfigurationEvent();
