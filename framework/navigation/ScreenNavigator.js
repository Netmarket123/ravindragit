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
  navigateBack,
} from './actions';

import NavigationBarStateManager from './NavigationBarStateManager';
import NavigationBarContainer from './NavigationBarContainer';

/**
 * The ScreenNavigator handles navigation to any of the
 * screens registered in the application. The state of
 * this navigator is synced with the redux store, and all
 * navigation operations should be performed through redux
 * actions.
 */
export class ScreenNavigator extends Component {
  constructor(props, context) {
    super(props, context);

    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.captureNavigatorRef = this.captureNavigatorRef.bind(this);
    this.setNavigationBarState = this.setNavigationBarState.bind(this);

    this.initialRoute = props.initialRoute;
    this.navBarManager = props.renderNavigationBar ? new NavigationBarStateManager()
      : this.context.parentNavigator.navBarManager;
  }

  getChildContext() {
    return {
      parentNavigator: this,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.action) {
      return;
    }

    // Set initial route if this is first executed action with route
    if (!this.initialRoute && nextProps.action.route) {
      this.initialRoute = nextProps.action.route;
    } else {
      this.performNavigationAction(nextProps.action);
    }
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

  setNavigationBarState(state, route) {
    this.navBarManager.setState(state, route);
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
        if (this.navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          this.navBarManager.onRouteRemoved(this.getCurrentRoute());
        }
        break;
      }
      default: {
        throw new Error(`Unsupported navigation action: ${action.type}`);
      }
    }

    // We should end up here only if we successfully performed
    // a navigation action.
    const { name } = this.props;
    this.props.navigationActionPerformed(action, navigator.getCurrentRoutes(), name);
  }

  captureNavigatorRef(navigator) {
    this.navigator = navigator;
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.PushFromRight;
  }

  renderNavigationBar() {
    // Navigation bar container should attach itself to the
    // navigation bar manager and call renderNavigationBar with
    // props passed by current screen when navigation bar manager
    // changes its state
    let navigationBarContainer;
    if (this.props.renderNavigationBar) {
      navigationBarContainer = (
        <NavigationBarContainer
          manager={this.navBarManager}
          renderNavigationBar={this.props.renderNavigationBar}
          navigateBack={this.props.navigateBack}
        />
      );
    }

    return navigationBarContainer;
  }

  renderScene(route) {
    const Screen = this.context.screens[route.screen];

    return (
      <Screen
        {...route.props}
        setNavBarProps={(state) => { this.setNavigationBarState(state, route)}}
      />
    );
  }

  render() {
    const navigatorComponent = this.initialRoute ? (
      <Navigator
        ref={this.captureNavigatorRef}
        initialRoute={this.initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={this.renderNavigationBar()}
      />
    ) : null;

    return navigatorComponent;
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
  }),

  /**
   * The action that will be triggered after each
   * navigation action is performed.
   */
  navigationActionPerformed: React.PropTypes.func.isRequired,

  /**
   * The action that will be passed to NavigationBar
   * to be used for navigate back
   */
  navigateBack: React.PropTypes.func.isRequired,

  /**
   * Function that takes props and render React Component that is used as navigation bar
   * if not set, it will inherit navigation bar of parent navigator
   */
  renderNavigationBar: React.PropTypes.func,
};

ScreenNavigator.contextTypes = {
  screens: React.PropTypes.object,
};

ScreenNavigator.childContextTypes = {
  parentNavigator: React.PropTypes.instanceOf(ScreenNavigator),
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
  return bindActionCreators({
    navigationActionPerformed,
    navigateBack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenNavigator);
