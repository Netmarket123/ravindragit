import React, {
  Component,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';

import {
  NAVIGATE_TO,
  NAVIGATE_BACK,
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

    const action = nextProps.action;
    switch (action.type) {
      case NAVIGATE_TO: {
        this.refs.navigator.push(action.route);
        break;
      }
      case NAVIGATE_BACK: {
        this.refs.navigator.pop();
        break;
      }
      default: {
        throw new Error(`Unsupported navigation action: ${action.type}`);
      }
    }
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route) {
    const Screen = this.context.screens[route.screen];

    return (
      <Screen {...route.props} />
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

export default connect(mapStateToProps)(ScreenNavigator);
