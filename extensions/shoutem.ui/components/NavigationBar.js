import React, {
  View,
  Image,
  StyleSheet,
} from 'react-native';

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
    backgroundColor: 'red',
  },
  componentsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'yellow',
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

  render() {
    return (
      <View style={[styles.container, this.style]}>
        <Image source={this.backgroundImage} style={[styles.backgroundImage, this.style]}>
          <View style={styles.componentsContainer}>
            <View style={styles.component}>{this.leftComponent}</View>
            <View style={styles.component}>{this.centerComponent}</View>
            <View style={styles.component}>{this.rightComponent}</View>
          </View>
        </Image>
      </View>
    );
  }
}

export default NavigationBar;
