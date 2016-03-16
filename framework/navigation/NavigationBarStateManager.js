import * as _ from 'lodash';

export default class NavigationBarStateManager {
  constructor() {
    this.setStateChangeListener = this.setStateChangeListener.bind(this);
    this.state = {
      title: 'Initial title',
    };

    this.routeStates = new Map();
  }

  onRouteChange(route) {
    console.log(`onRouteChange: ${JSON.stringify(route)}`);
    for (const [r, ro] of this.routeStates) {
      console.log(`${r.screen}: ${JSON.stringify(ro)}`);
    }
    this.currentRoute = route;

    const state = this.routeStates.get(route);
    if (state) {
      // Restore the navigation bar props that
      // are linked to the next route, if they exist.
      // This is necessary so that the navigation bar
      // props are restored when navigating back to
      // the screens that are already rendered, because
      // the navigator will not re-render the screen in
      // that case.
      this.setState(state);
    }
  }

  onRouteRemoved(route) {
    this.routeStates.delete(route);
  }

  setStateChangeListener(listener) {
    this.stateChangeListener = listener;
    this.triggerStateChangeListener(undefined, this.state);
  }

  triggerStateChangeListener(oldState, newState) {
    console.log('triggerStateChange');
    const listener = this.stateChangeListener;
    if (!listener) {
      return;
    }

    //if (_.isEqual(oldState, newState)) {
    //  return;
    //}

    _.defer(() => {
      console.log('triggered');
      listener(Object.assign({}, oldState), Object.assign({}, newState));
    });
  }

  setState(state) {
    console.log(`setState: ${JSON.stringify(state)}`);
    const oldState = this.state;
    const newState = Object.assign({}, oldState, state);

    this.state = newState;
    const route = this.currentRoute;
    this.routeStates.set(route, newState);
    this.triggerStateChangeListener(oldState, newState);
  }
}
