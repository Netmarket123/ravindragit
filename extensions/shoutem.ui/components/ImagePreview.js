import React, {
  View,
  StyleSheet,
  PropTypes,
  Modal,
  Image,
  TouchableOpacity,
  Component,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
};

const CLOSE_ICON_NAME = 'clear';
const CLOSE_ICON_SIZE = 25;

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
  closeIcon: {
    color: 'white',
    marginLeft: 10,
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
      const closeButton = (
        <View style={styles.header}>
          <TouchableOpacity style={styles.fullScreen} onPress={this.onPressCloseButton}>
            <Icon name={CLOSE_ICON_NAME} size={CLOSE_ICON_SIZE} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      );

      return (
        <Modal
          animated
        >
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

