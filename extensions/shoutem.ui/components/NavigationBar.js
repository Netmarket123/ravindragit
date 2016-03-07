import React, {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    padding: 15,
    alignItems: 'flex-start',
    backgroundColor: 'rbga(255, 0, 0, 1)',
  },
  componentsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  component: {
    flex: 1,
  },
});

class NavigationBar extends React.Component {
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
      <View style={styles.container}>
        <Image source={this.backgroundImage} style={styles.container}>
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
