import React, {
  Component,
  Navigator,
} from 'react-native';

class ScreenNavigator extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
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
      <Navigator
        initialRoute={this.props.initialRoute}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    );
  }
}

ScreenNavigator.propTypes = {
  initialRoute: React.PropTypes.shape({
    screen: React.PropTypes.string.isRequired,
    props: React.PropTypes.object,
    sceneConfig: React.PropTypes.object,
  }).isRequired,
};

ScreenNavigator.contextTypes = {
  screens: React.PropTypes.object,
};


export default ScreenNavigator;
