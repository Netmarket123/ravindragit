import React, {
  View,
  PropTypes,
  Modal,
  Image,
  TouchableOpacity,
  Component,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connectStyle } from '@shoutem/theme';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: Image.propTypes.source,
  style: PropTypes.object,
};

import makeComponentZoomable from './lib/ZoomableComponent';

const ZoomableImage = makeComponentZoomable(Image);

const CLOSE_ICON_NAME = 'clear';
const CLOSE_ICON_SIZE = 25;
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);

/**
 * Renders an ImagePreview which shows an inline image preview.
 * When clicked, the image is displayed in full screen.
 */
class ImagePreview extends Component {
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
    const { source, style, width, height } = this.props;

    if (this.state.fullScreen) {
      const closeButton = (
        <View style={style.header}>
          <TouchableOpacity style={style.fullScreen} onPress={this.onPressCloseButton}>
            <Icon name={CLOSE_ICON_NAME} size={CLOSE_ICON_SIZE} style={style.closeIcon} />
          </TouchableOpacity>
        </View>
      );

      return (
        <Modal
          animated
          transparent
        >
          <View style={style.fullScreenContainer}>
            <ZoomableImage
              style={style.image}
              source={source}
              resizeMode={'contain'}
            />
            {closeButton}
          </View>
        </Modal>
      );
    }

    return (
      <View style={[style.container, { width, height }]}>
        <TouchableOpacity onPress={this.onPressImage} >
          <Image
            source={source}
            width={width}
            height={height}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const style = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: STATUS_BAR_OFFSET,
    left: 0,
    backgroundColor: 'transparent',
  },
  closeIcon: {
    color: 'white',
    marginLeft: 15,
    marginTop: 20,
  },
};

ImagePreview.propTypes = propTypes;

export default connectStyle('shoutem.ui.ImagePreview', style)(ImagePreview);
