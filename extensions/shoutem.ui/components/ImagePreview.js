import React, {
  View,
  StyleSheet,
  PropTypes,
  Modal,
  Image,
  TouchableOpacity,
  Component,
  Text,
} from 'react-native';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  closeButton: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
  },
});

/**
 * Renders an ImagePreview which shows an inline image preview
 * which displays the image in full screen when clicked
 */
export default class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.onPressCloseButton = this.onPressCloseButton.bind(this);
    this.onPressImage = this.onPressImage.bind(this);
  }

  state = {
    fullScreen: false,
  }

  onPressCloseButton() {
    this.setState({
      fullScreen: false,
    });
  }

  onPressImage() {
    this.setState({
      fullScreen: true,
    });
  }

  render() {
    const { source, width, height } = this.props;

    if (this.state.fullScreen) {
      // TODO(Vladimir): use clear icon from material icon set instead of x
      const closeButton = (
        <View style={styles.header}>
          <TouchableOpacity style={styles.fullScreen} onPress={this.onPressCloseButton}>
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>
      );

      return (
        <Modal>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={source}
              resizeMode={'contain'}
            />
            {closeButton}
          </View>
        </Modal>
      );
    }

    return (
      <View style={[styles.container, { width, height }]}>
        <TouchableOpacity onPress={this.onPressImage} >
          <Image
            source={source}
            width={width}
            height={height}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

ImagePreview.propTypes = propTypes;

