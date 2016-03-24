import React, {
  Component,
  View,
  StyleSheet,
  Image,
  PropTypes,
  Dimensions,
  PixelRatio,
} from 'react-native';

import { connect } from 'react-redux';
import PagedScroller from '../components/PagedScroller';
import ContinuousScroller from '../components/ContinuousScroller';
import { configuration as appConfiguration } from 'shoutem.application';
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


function mapStateToProps(state) {
  return {
    appState: { 'shoutem.core.configuration': appConfiguration, ...state },
  };
}

function getScrollerComponentForType(type) {
  return type === 'paged' ? PagedScroller : ContinuousScroller;
}

class HomeScreen extends Component {
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
    const { appState } = this.props;
    const propsCreator = new PropsCreator(appState['shoutem.core.configuration'],
                                          getWindowDimensionsInPixels());

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

export default connect(mapStateToProps)(HomeScreen);
