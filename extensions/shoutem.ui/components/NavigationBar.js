import React, {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
});

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
    const leftComponent = this.props.leftComponent || this.renderBackButton;
    const centerComponent = this.props.centerComponent;
    const rightComponent = this.props.rightComponent;

    return (
      <View style={[styles.container, this.props.style]}>
        <Image source={this.backgroundImage} style={[styles.backgroundImage, this.props.style]}>
          <View style={styles.componentsContainer}>
            <View style={styles.component}>{leftComponent}</View>
            <View style={styles.component}>{centerComponent}</View>
            <View style={styles.component}>{rightComponent}</View>
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

export default NavigationBar;
