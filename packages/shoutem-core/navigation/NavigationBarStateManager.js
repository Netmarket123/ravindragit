import * as _ from 'lodash';

export default class NavigationBarStateManager {
  constructor() {
    this.setStateChangeListener = this.setStateChangeListener.bind(this);
    this.state = {};

    this.navigatorState = null;
  }

  setStateChangeListener(listener) {
    this.stateChangeListener = listener;
    this.triggerStateChangeListener(undefined, this.state);
  }

  triggerStateChangeListener(oldState, newState) {
    const listener = this.stateChangeListener;
    if (!listener) {
      return;
    }

    listener(_.assign({}, oldState), _.assign({}, newState));
  }

  setState(state, route, navigatorState) {
    const oldState = this.state;
    const newState = _.assign({}, state, { id: route.id });

    this.navigatorState = navigatorState;
    this.state = newState;
    this.triggerStateChangeListener(oldState, newState);
  }
}
