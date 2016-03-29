import React, {
  Component,
  View,
  StyleSheet,
  Image,
  PropTypes,
  Dimensions,
  PixelRatio,
} from 'react-native';

import PagedScroller from '../components/PagedScroller';
import ContinuousScroller from '../components/ContinuousScroller';
import PropsCreator from './HomeScreenPropsCreator';

const propTypes = {
  appState: PropTypes.shape({
    'shoutem.core.configuration': PropTypes.object,
  }),
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

function getWindowDimensionsInPixels() {
  const {
      height,
      width,
    } = Dimensions.get('window');

  return {
    height: PixelRatio.getPixelSizeForLayoutSize(height),
    width: PixelRatio.getPixelSizeForLayoutSize(width),
  };
}

function getScrollerComponentForType(type) {
  return type === 'paged' ? PagedScroller : ContinuousScroller;
}

export default class HomeScreen extends Component {
  renderShortcuts(propsCreator) {
    const ScrollerComponent = getScrollerComponentForType(propsCreator.getScrollType());

    return (
      <ScrollerComponent
        layoutPosition={propsCreator.getLayoutPosition()}
        shortcutsData={propsCreator.getShortcutsData()}
        dimensions={propsCreator.getLayoutDimensions()}
      />
    );
  }

  render() {
    const { settings, shortcuts } = this.props;
    const propsCreator = new PropsCreator(settings, getWindowDimensionsInPixels());

    return (
      <Image source={{ uri: propsCreator.getBackgroundImage() }} style={styles.backgroundImage}>
        <View style={[styles.content, propsCreator.getLayoutMarginStyle()]}>
          {this.renderShortcuts(propsCreator)}
        </View>
      </Image>
    );
  }
}

HomeScreen.propTypes = propTypes;
