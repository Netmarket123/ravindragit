import React, {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { connect } from 'react-redux';

import {
  navigateBack,
} from 'shoutem/navigation';

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
  },
  componentsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  component: {
    backgroundColor: 'white',
    width: 50,
    height: 24,
  },
});

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerComponent: false,
    };

    this.setCenterComponent = this.setCenterComponent.bind(this);
  }
  setLeftComponent(component) {
    this.leftComponent = component;
  }

  setRightComponent(component) {
    this.rightComponent = component;
  }

  setBackgroundImage(image) {
    this.backgroundImage = image;
  }

  setCenterComponent(component) {
    this.centerComponent = component;
  }
  
  navigateBack() {
    const { dispatch } = this.props;
    dispatch(navigateBack());
  }

  render() {
    return (
      <View style={[styles.container, this.style]}>
        <Image source={this.backgroundImage} style={[styles.backgroundImage, this.style]}>
          <View style={styles.componentsContainer}>
            <View style={styles.component}><TouchableOpacity
          style={styles.button}
          onPress={() => this.navigateBack()}>
          <Text>Back</Text>
        </TouchableOpacity></View>
            <View style={styles.component}>{this.centerComponent}</View>
            <View style={styles.component}>{this.rightComponent}</View>
          </View>
        </Image>
      </View>
    );
  }
}

export default connect()(NavigationBar);
