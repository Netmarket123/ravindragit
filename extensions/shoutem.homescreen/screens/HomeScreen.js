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
import HomeScreenSettingsReader from '../HomeScreenSettingsReader';
import PropsCreator from './HomeScreenPropsCreator';
import shortcutDataShape from '../components/ShortcutDataShape';

const propTypes = {
  appState: PropTypes.shape({
    'shoutem.core.configuration': PropTypes.object,
  }),
  setNavBarProps: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
  settings: PropTypes.object.isRequired,
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
  renderShortcuts(propsCreator, shortcuts) {
    const ScrollerComponent = getScrollerComponentForType(propsCreator.getScrollType());

    return (
      <ScrollerComponent
        layoutPosition={propsCreator.getLayoutPosition()}
        shortcutsData={shortcuts}
        buttonConfig={propsCreator.getButtonConfiguration()}
        dimensions={propsCreator.getLayoutDimensions()}
      />
    );
  }

  render() {
    const { settings, shortcuts, setNavBarProps } = this.props;
    const settingsReader = new HomeScreenSettingsReader(settings);
    const propsCreator = new PropsCreator(settingsReader, getWindowDimensionsInPixels());

    setNavBarProps({});
    return (
      <Image source={{ uri: propsCreator.getBackgroundImage() }} style={styles.backgroundImage}>
        <View style={[styles.content, propsCreator.getLayoutMarginStyle()]}>
          {this.renderShortcuts(propsCreator, shortcuts)}
        </View>
      </Image>
    );
  }
}

HomeScreen.propTypes = propTypes;
