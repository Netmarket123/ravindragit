import * as _ from 'lodash';

export default class NavigationBarStateManager {
  constructor() {
    this.setStateChangeListener = this.setStateChangeListener.bind(this);
    this.state = {
      title: 'Initial title',
    };

    this.routeStates = new Map();
  }

  onRouteRemoved(route) {
    this.routeStates.delete(route);
    // we need to save this route, because render method of
    // outgoing screen is called one more time after back action is performed
    // so, we want to escape possible addition of deleted route to routeStates again
    this.deletedRoute = route;
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
  
  setState(state, route) {
    const oldState = this.state;
    const newState = _.assign({}, state);

    if ((!this.deletedRoute || route !== this.deletedRoute)
      && (!this.routeStates.get(route)
        || this.routeStates.size < 1
        || state !== this.routeStates.get(route))) {
      this.routeStates.set(route, newState);
      this.state = newState;
      this.triggerStateChangeListener(oldState, newState);
      this.currentRoute = route;
    }
  }
}
