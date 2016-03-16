import React, {
  Component,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  NAVIGATE_TO,
  NAVIGATE_BACK,

  navigationActionPerformed,
} from './actions';

import NavigationBar from './NavigationBar';
import NavigationBarStateManager from './NavigationBarStateManager';

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

    console.log('Screen navigator constructor');

    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.beforeRouteChange = this.beforeRouteChange.bind(this);
    this.captureNavigatorRef = this.captureNavigatorRef.bind(this);
    this.setNavigationBarState = this.setNavigationBarState.bind(this);

    this.navBarManager = new NavigationBarStateManager();
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

  setNavigationBarState(state) {
    this.navBarManager.setState(state);
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
        this.navBarManager.onRouteRemoved(this.getCurrentRoute());
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

  beforeRouteChange(route) {
    this.navBarManager.onRouteChange(route);
  }

  captureNavigatorRef(navigator) {
    this.navigator = navigator;
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  }

  renderNavigationBar() {
    // Navigation bar should attach itself to the
    // navigation bar manager.
    return (
      <NavigationBar
        manager={this.navBarManager}
      />
    );
  }

  renderScene(route) {
    const Screen = this.context.screens[route.screen];

    return (
      <Screen
        setNavBarProps={this.setNavigationBarState}
        {...route.props}
      />
    );
  }

  render() {
    console.log('Screen navigator render');
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
