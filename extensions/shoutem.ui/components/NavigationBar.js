import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import connectStyle from 'shoutem/theme/StyleConnector';

import {
  navigateBack,
} from 'shoutem/navigation';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    const { dispatch } = this.props;
    dispatch(navigateBack());
  }

  render() {
    const backButton = (
      <TouchableOpacity onPress={this.navigateBack}>
        <Text>Back</Text>
      </TouchableOpacity>
    );
    const leftComponent = this.props.hasHistory && !this.props.leftComponent ? backButton
      : this.props.leftComponent;
    const {
      style,
      centerComponent,
      rightComponent,
    } = this.props;

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
  dispatch: React.PropTypes.func,
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
  },
};

export default connect()(
  connectStyle('dev.shoutem.NavigationBar', style)(NavigationBar)
);
