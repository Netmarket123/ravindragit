import React, {
  Component,
  Navigator,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';

import {
  NAVIGATE_TO,
  NAVIGATE_BACK,

  navigationActionPerformed,
} from './actions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    props.navBarControls.setNavigationBar(this);
    this.state = {
      title: props.title,
    };
  }

  setOptions(options) {
    // We need to defer the setState call here,
    // because the screens will usually change the
    // navigation bar options in their render methods,
    // but we shouldn't call setState during render...
    _.defer(() => {
      this.setState(options);
    });
  }

  render() {
    return (
      <Text>{this.state.title}</Text>
    );
  }
}

NavigationBar.propTypes = {
  navBarControls: React.PropTypes.object.isRequired,
  title: React.PropTypes.string,
};

class NavigationBarControls {
  constructor(onOptionsChanged) {
    this.onOptionsChanged = onOptionsChanged;
    this.navBarOptions = {
      title: 'Initial title',
    };
  }

  setNavigationBar(navigationBar) {
    this.navigationBar = navigationBar;
    this.onOptionsUpdated();
  }

  setTitle(title) {
    this.navBarOptions.title = title;
    this.onOptionsUpdated();
  }

  setOptions(options, silent) {
    this.navBarOptions = Object.assign({}, options);
    this.onOptionsUpdated(silent);
  }

  onOptionsUpdated(silent) {
    if (!silent) {
      this.onOptionsChanged(this.getOptions());
    }

    if (this.navigationBar) {
      this.navigationBar.setOptions(this.navBarOptions);
    }
  }

  getOptions() {
    return Object.assign({}, this.navBarOptions);
  }
}

/**
 * The ScreenNavigator handles navigation to any of the
 * screens registered in the application. The state of
 * this navigator is synced with the redux store, and all
 * navigation operations should be performed through redux
 * actions.
 */
export class ScreenNavigator extends Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.saveNavBarOptions = this.saveNavBarOptions.bind(this);
    this.beforeRouteChange = this.beforeRouteChange.bind(this);
    this.captureNavigatorRef = this.captureNavigatorRef.bind(this);

    this.navBarControls = new NavigationBarControls(this.saveNavBarOptions);
    this.routeNavBarOptions = new Map();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.action) {
      return;
    }

    this.performNavigationAction(nextProps.action);
  }

  shouldComponentUpdate(nextProps) {
    // We should re-render only if there is a
    // pending navigation action available.
    return !!nextProps.action;
  }

  getCurrentRoute() {
    const navigator = this.navigator;
    if (navigator) {
      const routes = navigator.getCurrentRoutes();
      return routes[routes.length - 1];
    }

    return undefined;
  }

  /**
   * Performs the navigation action, and dispatches
   * the navigationActionPerformed action after the
   * action is performed, to sync the redux state
   * with the components state.
   * @param action The navigation action to perform.
     */
  performNavigationAction(action) {
    const navigator = this.navigator;
    switch (action.type) {
      case NAVIGATE_TO: {
        navigator.push(action.route);
        break;
      }
      case NAVIGATE_BACK: {
        this.clearNavBarOptionsForRoute(this.getCurrentRoute());
        navigator.pop();
        break;
      }
      default: {
        throw new Error(`Unsupported navigation action: ${action.type}`);
      }
    }

    // We should end up here only if we successfully performed
    // a navigation action.
    this.props.navigationActionPerformed(action, navigator.getCurrentRoutes(), this.props.name);
  }

  /**
   * Saves the navigation bar options for the
   * currently active route.
   * @param options The options to save.
     */
  saveNavBarOptions(options) {
    const route = this.getCurrentRoute();
    if (!route) {
      return;
    }

    this.routeNavBarOptions.set(route, options);
  }

  /**
   * Clears (deletes) the navigation bar options
   * for the specified route.
   * @param route The route to clear the options for.
     */
  clearNavBarOptionsForRoute(route) {
    this.routeNavBarOptions.delete(route);
  }

  beforeRouteChange(route) {
    const options = this.routeNavBarOptions.get(route);
    if (options) {
      // Restore the navigation bar options that
      // are linked to the next route, if they exist.
      // This is necessary so that the navigation bar
      // options are restored when navigating back to
      // the screens that are already rendered, because
      // the navigator will not re-render the screen in
      // that case.
      //
      // The silent argument here indicates that we don't
      // want to trigger any options change callbacks, this
      // is because the route for which we are setting the
      // options is not yet active.
      this.navBarControls.setOptions(options, true);
    }
  }

  captureNavigatorRef(navigator) {
    this.navigator = navigator;
    const options = this.navBarControls.getOptions();

    // Record any navigation bar options that
    // may be setup during the first render call
    // when the navigator ref wasn't yet available.
    this.saveNavBarOptions(options);
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  }

  renderNavigationBar() {
    const options = this.navBarControls.getOptions();

    // Navigation bar should attach itself to the
    // navigation bar controls.
    return (
      <NavigationBar
        navBarControls={this.navBarControls}
        {...options}
      />
    );
  }

  renderScene(route) {
    const Screen = this.context.screens[route.screen];

    return (
      <Screen navigationBar={this.navBarControls} {...route.props} />
    );
  }

  render() {
    return (
      <Navigator ref={this.captureNavigatorRef}
        initialRoute={this.props.initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={this.renderNavigationBar()}
        onWillFocus={this.beforeRouteChange}
      />
    );
  }
}

ScreenNavigator.propTypes = {
  /**
   * The navigator name, this value should be unique
   * within one application.
   */
  name: React.PropTypes.string.isRequired,

  /**
   * The initial route to navigate to.
   */
  initialRoute: React.PropTypes.shape({
    screen: React.PropTypes.string.isRequired,
    props: React.PropTypes.object,
    sceneConfig: React.PropTypes.object,
  }).isRequired,

  /**
   * The action that will be triggered after each
   * navigation action is performed.
   */
  navigationActionPerformed: React.PropTypes.func.isRequired,
};

ScreenNavigator.contextTypes = {
  screens: React.PropTypes.object,
};

// Connect to the redux state

function mapStateToProps(state, ownProps) {
  const navigationState = state['shoutem.core'].navigation;
  const navigatorState = navigationState[ownProps.name] || {};
  return {
    action: navigatorState.action,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ navigationActionPerformed }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenNavigator);
