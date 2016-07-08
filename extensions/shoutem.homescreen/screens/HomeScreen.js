import React, {
  Component,
  View,
  StyleSheet,
  Image,
  PropTypes,
  Dimensions,
  PixelRatio,
  InteractionManager,
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
  setNavBarProps: PropTypes.func,
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

  /**
   * the dimensions need to be divided with the device pixel ratio as layout
   * used for reference is using a singular pixel ratio
   */
  return {
    height: PixelRatio.getPixelSizeForLayoutSize(height) / PixelRatio.get(),
    width: PixelRatio.getPixelSizeForLayoutSize(width) / PixelRatio.get(),
  };
}

function getScrollerComponentForScrollType(type) {
  return type === 'paged' ? PagedScroller : ContinuousScroller;
}

export default class HomeScreen extends Component {
  state = {
    isAnimationFinished: false,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ isAnimationFinished: true });
    });
  }

  hideNavigationBar() {
    // Ensure that back button is not shown
    const emptyView = <View />;
    this.props.setNavBarProps({
      leftComponent: emptyView,
      style: {
        container: {
          height: 0,
          backgroundColor: '#002e51',
        },
      },
    });
  }

  renderShortcuts(propsCreator, shortcuts) {
    const ScrollerComponent = getScrollerComponentForScrollType(propsCreator.getScrollType());

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
    const { settings, shortcuts } = this.props;
    const settingsReader = new HomeScreenSettingsReader(settings);
    const propsCreator = new PropsCreator(settingsReader, getWindowDimensionsInPixels());

    if (this.state.isAnimationFinished) {
      this.hideNavigationBar();
    }

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
