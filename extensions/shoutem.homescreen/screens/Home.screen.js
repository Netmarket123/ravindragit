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
import PagedShortcuts from '../components/PagedShortcuts.js';
import ContinuousScroller from '../components/ContinuousShortcuts';
import ConfigurationReader from '../ConfigurationReader';
import { configuration as appConfiguration } from 'shoutem.application';
import Scaler from '../Scaler';

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

const layoutAlignments = {
  topLeft: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'flex-start',
  },
  topCenter: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'center',
  },
  topRight: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'flex-end',
  },
  middleLeft: {
    verticalAlignment: 'center',
    horizontalAlignment: 'flex-start',
  },
  middleCenter: {
    verticalAlignment: 'center',
    horizontalAlignment: 'center',
  },
  middleRight: {
    verticalAlignment: 'center',
    horizontalAlignment: 'flex-end',
  },
  bottomLeft: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'flex-start',
  },
  bottomCenter: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'center',
  },
  bottomRight: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'flex-end',
  },
};

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

class HomeScreenPropsCreator {
  constructor(configuration) {
    this.configurationProvider = new ConfigurationReader(configuration);
    this.scaler = new Scaler(
      this.configurationProvider.getScalingStrategy(),
      getWindowDimensionsInPixels(),
      this.configurationProvider.getLayoutDimension()
    );
  }

  getButtonConfiguration() {
    return {
      size: this.scaler.scale(this.configurationProvider.getButtonSize()),
      iconSize: this.scaler.scale(this.configurationProvider.getButtonIconSize()),
      margin: this.scaler.scale(this.configurationProvider.getButtonMargin()),
    };
  }

  getShortcutsData() {
    return this.configurationProvider.getShortcuts().map(shortcut => ({
      uri: shortcut.buttonImageUrl,
      highlightedUri: shortcut.buttonImageHighlightedUrl,
      config: this.getButtonConfiguration(),
    }));
  }

  getLayoutDimensions() {
    return {
      rows: this.configurationProvider.getRowCount(),
      cols: this.configurationProvider.getColumnCount(),
    };
  }

  getBackgroundImage() {
    return this.configurationProvider.getHomeScreenBackgroundImageWide() ||
      this.configurationProvider.getHomeScreenBackgroundImage();
  }

  getLayoutPosition() {
    return layoutAlignments[this.configurationProvider.getLayoutPosition()];
  }

  getLayoutMarginStyle() {
    const margin = this.configurationProvider.getLayoutMargin();

    return this.scaler.scale({
      marginTop: margin.top,
      marginBottom: margin.bottom,
      marginLeft: margin.left,
      marginRight: margin.right,
    });
  }

  getScrollType() {
    return this.configurationProvider.getScrollType();
  }

  getLayoutType() {
    return this.configurationProvider.getLayoutType();
  }
}

function mapStateToProps(state) {
  return {
    appState: { 'shoutem.core.configuration': appConfiguration, ...state },
  };
}

class Home extends Component {
  renderShortcuts(propsCreator) {
    if (propsCreator.getScrollType() === 'continuous') {
      return (
        <ContinuousScroller
          layoutPosition={propsCreator.getLayoutPosition()}
          shortcutsData={propsCreator.getShortcutsData()}
          dimensions={propsCreator.getLayoutDimensions()}
          layoutType={propsCreator.getLayoutType()}
        />
      );
    }

    return (
      <PagedShortcuts
        layoutPosition={propsCreator.getLayoutPosition()}
        shortcutsData={propsCreator.getShortcutsData()}
        dimensions={propsCreator.getLayoutDimensions()}
        layoutType={propsCreator.getLayoutType()}
      />
    );
  }

  render() {
    const { appState } = this.props;
    const propsCreator = new HomeScreenPropsCreator(appState['shoutem.core.configuration']);

    return (
      <Image source={{ uri: propsCreator.getBackgroundImage() }} style={styles.backgroundImage}>
        <View style={[styles.content, propsCreator.getLayoutMarginStyle()]}>
          {this.renderShortcuts(propsCreator)}
        </View>
      </Image>
    );
  }
}

Home.propTypes = propTypes;

export default connect(mapStateToProps)(Home);
