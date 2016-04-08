import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connectStyle } from 'shoutem/theme';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.renderBackButton = this.renderBackButton.bind(this);
  }

  renderBackButton() {
    const { hasHistory, navigateBack } = this.props;
    const backButton = hasHistory ? (<TouchableOpacity onPress={navigateBack}>
      <Text>Back</Text>
    </TouchableOpacity>) : null;

    return backButton;
  }

  render() {
    const {
      style,
      centerComponent,
      rightComponent,
      } = this.props;

    const leftComponent = this.props.leftComponent || this.renderBackButton();

    return (
      <View style={style.container}>
        <Image source={this.backgroundImage} style={style.backgroundImage}>
          <View style={style.componentsContainer}>
            <View style={style.component}>{leftComponent}</View>
            <View style={style.component}>{centerComponent}</View>
            <View style={style.component}>{rightComponent}</View>
          </View>
        </Image>
      </View>
    );
  }
}

NavigationBar.propTypes = {
  leftComponent: React.PropTypes.object,
  centerComponent: React.PropTypes.object,
  rightComponent: React.PropTypes.object,
  style: React.PropTypes.object,
  hasHistory: React.PropTypes.bool,
  navigateBack: React.PropTypes.func,
};

const style = {
  backgroundImage: {
    padding: 15,
    backgroundColor: 'transparent',
    height: 70,
  },
  container: {
    height: 70,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  componentsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  component: {
    height: 24,
    marginBottom: -8,
    alignSelf: 'flex-end',
  },
  backButton: {},
};

export default connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);
