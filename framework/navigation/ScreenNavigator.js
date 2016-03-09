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

class ScreenNavigator extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.action) {
      return;
    }

    const navigator = this.refs.navigator;
    const action = nextProps.action;
    switch (action.type) {
      case NAVIGATE_TO: {
        navigator.push(action.route);
        break;
      }
      case NAVIGATE_BACK: {
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

  shouldComponentUpdate(nextProps) {
    return nextProps.action;
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    const Screen = this.context.screens[route.screen];

    return (
      <Screen navigator={navigator} {...route.props} />
    );
  }

  render() {
    return (
      <Navigator ref="navigator"
        initialRoute={this.props.initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    );
  }
}

ScreenNavigator.propTypes = {
  name: React.PropTypes.string.isRequired,
  initialRoute: React.PropTypes.shape({
    screen: React.PropTypes.string.isRequired,
    props: React.PropTypes.object,
    sceneConfig: React.PropTypes.object,
  }).isRequired,
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
