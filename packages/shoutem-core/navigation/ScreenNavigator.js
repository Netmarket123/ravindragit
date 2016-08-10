import React, {
  Component,
} from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  NAVIGATE_TO,
  NAVIGATE_BACK,

  navigationActionPerformed,
  navigateBack,

  addNavigator,
  popNavigator,
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
  static defaultProps = {
    active: true,
  }

  constructor(props, context) {
    super(props, context);

    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.captureNavigatorRef = this.captureNavigatorRef.bind(this);
    this.setNavBarState = this.setNavBarState.bind(this);
    this.onRouteChanged = this.onRouteChanged.bind(this);
    this.onRouteWillChange = this.onRouteWillChange.bind(this);

    this.initialRoute = props.initialRoute;
    this.navBarManager = props.renderNavigationBar ? new NavigationBarStateManager()
      : this.context.parentNavigator.navBarManager;
    this.state = {
      deactivatedRoute: null,
      activeRoute: null,
    };
  }

  getChildContext() {
    return {
      parentNavigator: this,
    };
  }

  componentWillMount() {
    if (this.isActive()) {
      this.addNavigator();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.willBecomeActive(nextProps, nextContext)) {
      this.addNavigator();
    }

    if (this.willBecomeInActive(nextProps, nextContext)) {
      this.popNavigator();
    }

    if (!nextProps.action || nextProps.action === this.props.action) {
      return;
    }

    // Set initial route if this is first executed action with route
    if (!this.initialRoute && nextProps.action.route) {
      this.initialRoute = nextProps.action.route;
    } else {
      this.deactivateRoute(this.state.activeRoute, () => {
        this.performNavigationAction(nextProps.action);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We should re-render only if there is a
    // pending navigation action available.
    // Or if navigator has became active as child
    return !!nextProps.action || nextState !== this.state;
  }

  onRouteWillChange(route) {
    if (!route.id) {
      // Used as NavigationBar key to render new screen navigation bar
      // eslint-disable-next-line  no-param-reassign
      route.id = this.props.name + this.getLastRouteIndex();
    }
    this.activateRoute(route);
    this.props.blockActions();
  }

  onRouteChanged() {
    this.props.allowActions();
  }

  getLastRouteIndex() {
    if (!this.navigator) {
      return 0;
    }
    return this.navigator.getCurrentRoutes().length + 1;
  }

  getCurrentRoute() {
    const navigator = this.navigator;
    if (navigator) {
      const routes = navigator.getCurrentRoutes();
      return routes[routes.length - 1];
    }

    return undefined;
  }

  setNavBarState(state, route) {
    this.navBarManager.setState(state, route);
  }

  activateRoute(activeRoute, cb = () => {}) {
    this.setState({ activeRoute }, cb);
  }

  deactivateRoute(deactivatedRoute, cb = () => {}) {
    this.setState({ deactivatedRoute }, cb);
  }

  componentWillUnMount() {
    this.popNavigator();
  }

  addNavigator() {
    this.props.addNavigator(this.props.name);
  }

  popNavigator() {
    this.props.popNavigator(this.props.name);
  }

  isActive(props = this.props) {
    return props.active;
  }

  willBecomeActive(nextProps) {
    return this.isActive(nextProps) && !this.isActive();
  }

  willBecomeInActive(nextProps) {
    return !this.isActive(nextProps) && this.isActive();
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
        if (!action.navigatorMethod) {
          throw new Error(`Unexisting navigator method: ${action.navigatorMethod}`);
        }
        navigator[action.navigatorMethod](action.route);
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
    const { action, name } = this.props;
    this.navigator = navigator;
    if (!navigator) {
      // On componentWillUnMount ref is called with null
      // In that case NO navigation action is performed
      // (at least not with this navigator)
      return;
    }
    this.props.navigationActionPerformed(action, this.navigator.getCurrentRoutes(), name);
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

    if (!Screen) {
      throw new Error(`You are trying to navigate to screen (${route.screen}) that doesn't exist. 
      Check exports of your extension or route you are trying to navigate to.`);
    }

    return (
      <Screen
        {...route.props}
        focused={route === this.state.activeRoute && route !== this.state.deactivatedRoute}
        // eslint-disable-next-line react/jsx-no-bind
        setNavBarProps={state => this.isActive() && this.setNavBarState(state, route)}
      />
    );
  }

  render() {
    const navigatorComponent = this.initialRoute ? (
      <Navigator
        ref={this.captureNavigatorRef}
        initialRoute={this.initialRoute}
        initialRouteStack={this.props.initialRouteStack}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={this.renderNavigationBar()}
        onDidFocus={this.onRouteChanged}
        sceneStyle={this.props.sceneStyle}
        onWillFocus={this.onRouteWillChange}
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
   * Initial route stack to which routes we can perform navigate action
   */
  initialRouteStack: React.PropTypes.array,

  /**
   * Action to be triggered by screen navigator.
   */
  action: React.PropTypes.object,

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

  /**
   * The action that will postpone all action executions. Actions will executed in bulk after
   * screen transitions
   */
  blockActions: React.PropTypes.func,

  /**
   * This action will be dispatched after screen transition and will cause all actions
   * that are blocked to be executed then.
   */
  allowActions: React.PropTypes.func,

  /**
   * Adds navigator to global navigator stack.
   */
  addNavigator: React.PropTypes.func,

  /**
   * Pops navigator and it children from global navigator stack.
   */
  popNavigator: React.PropTypes.func,

  /**
   * This is default style to apply to the container of each scene
   */
  sceneStyle: React.PropTypes.object,

  /**
   * Indicates if navigator is active.
   * Only active navigators are rendered (it children and navBar).
   */
  active: React.PropTypes.bool,
};

ScreenNavigator.contextTypes = {
  screens: React.PropTypes.object,
  parentNavigator: React.PropTypes.object,
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
    addNavigator,
    popNavigator,
    blockActions() {
      return { type: 'BLOCK_ACTIONS' };
    },
    allowActions() {
      return { type: 'ALLOW_ACTIONS' };
    },
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenNavigator);
