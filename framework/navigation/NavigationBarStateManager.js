import * as _ from 'lodash';

export default class NavigationBarStateManager {
  constructor() {
    this.setStateChangeListener = this.setStateChangeListener.bind(this);
    this.state = {};

    this.routeStates = new Map();
  }

  onRouteChanged(route) {
    const state = this.routeStates.get(route);
    this.currentRoute = route;
    this.setState(state, route);
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

    if (!_.isEqual(oldState, newState)) {
      listener(_.assign({}, oldState), _.assign({}, newState));
    }
  }

  isRouteRemoved(route) {
    return this.deletedRoute && route === this.deletedRoute;
  }

  stateShouldChange(route, newState) {
    return (!this.routeStates.get(route) ||
    this.routeStates.size < 1 ||
    newState !== this.routeStates.get(route));
  }

  setState(state, route) {
    const oldState = this.state;
    const newState = _.assign({}, state);

    if (!this.isRouteRemoved(route) && this.stateShouldChange(route, newState)) {
      this.routeStates.set(route, newState);
      this.state = newState;
      this.triggerStateChangeListener(oldState, newState);
    }
  }
}
