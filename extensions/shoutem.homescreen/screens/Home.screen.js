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
import ContinuousShortcuts from '../components/ContinuousShortcuts';
import ConfigurationReader from '../ConfigurationReader';
import { configuration as appConfiguration } from 'shoutem.application';
import Rescaler from '../Rescaler';

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
    this.scaler = new Rescaler(
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
}

function mapStateToProps(state) {
  return {
    appState: { 'shoutem.core.configuration': appConfiguration, ...state },
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    const { appState } = this.props;
    const propsCreator = new HomeScreenPropsCreator(appState['shoutem.core.configuration']);

    console.warn(JSON.stringify(props.appState));

    this.state = {
      backgroundImage: {
        uri: propsCreator.getBackgroundImage(),
      },
      scrollType: propsCreator.getScrollType(),
      layoutMargin: propsCreator.getLayoutMarginStyle(),
    };
  }

  renderShortcuts() {
    const { appState } = this.props;
    const propsCreator = new HomeScreenPropsCreator(appState['shoutem.core.configuration']);

    if (this.state.scrollType === 'continuous') {
      return (
        <ContinuousShortcuts
          layoutPosition={propsCreator.getLayoutPosition()}
          shortcutsData={propsCreator.getShortcutsData()}
        />
      );
    }

    return (
      <PagedShortcuts
        layoutPosition={propsCreator.getLayoutPosition()}
        shortcutsData={propsCreator.getShortcutsData()}
        dimensions={propsCreator.getLayoutDimensions()}
      />
    );
  }

  render() {
    return (
      <Image source={ this.state.backgroundImage } style={styles.backgroundImage}>
        <View style={[styles.content, this.state.layoutMargin]}>
          {this.renderShortcuts()}
        </View>
      </Image>
    );
  }
}

Home.propTypes = propTypes;

export default connect(mapStateToProps)(Home);
