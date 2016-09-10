import _ from 'lodash';
import EventEmitter from 'events';
import { getActiveTheme, getConfiguration } from '../redux';

let activeConfiguration;

const Events = {
  ACTIVE_THEME_CHANGE: 'activeThemeChanged',
  CONFIGURATION_CHANGE: 'configurationChanged',
};

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

function watchActiveTheme(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const theme = getActiveTheme(store.getState());
    if (theme && theme !== app.getTheme()) {
      onChange(theme);
    }
  });
}

class AppEvents extends EventEmitter {
  init(app) {
    this.eventEmitter = new EventEmitter();
    watchActiveTheme(app, theme => this.emit(Events.ACTIVE_THEME_CHANGE, theme));
    watchConfiguration(app, configuration => this.emit(Events.CONFIGURATION_CHANGE, configuration));
  }

  prependListener(type, firstListener) {
    const oldListeners = [...this.listeners(type)];

    this.removeAllListeners(type);

    const subscription = this.on(type, firstListener);
    oldListeners.forEach(listener => this.on(type, listener));

    return subscription;
  }

  prependActiveThemeListener(listener) {
    return this.prependListener(Events.ACTIVE_THEME_CHANGE, listener);
  }

  addActiveThemeListener(listener) {
    return this.on(Events.ACTIVE_THEME_CHANGE, listener);
  }

  prependConfigurationListener(listener) {
    return this.prependListener(Events.CONFIGURATION_CHANGE, listener);
  }

  addConfigurationListener(listener) {
    return this.on(Events.CONFIGURATION_CHANGE, listener);
  }

}

export const appEvents = new AppEvents();
