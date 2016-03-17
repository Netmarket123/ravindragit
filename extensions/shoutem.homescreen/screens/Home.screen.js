import React, {
  Component,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import PagedShortcuts from '../components/PagedShortcuts.js';
import ContinuousShortcuts from '../components/ContinuousShortcuts';
import ConfigurationReader from '../ConfigurationReader';
import { configuration } from 'shoutem.application';

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

function getBackgroundImage(configurationProvider) {
  return configurationProvider.getHomeScreenBackgroundImageWide() ||
    configurationProvider.getHomeScreenBackgroundImage();
}

function getLayoutPosition(configurationProvider) {
  return layoutAlignments[configurationProvider.getLayoutPosition()];
}

// TODO(Vladimir) - scale according to screen size
function getLayoutMarginStyle(margin) {
  return {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };
}

function getButtonConfiguration(configurationProvider) {
  return {
    layoutDimension: configurationProvider.getLayoutDimension(),
    scalingStrategy: configurationProvider.getScalingStrategy(),
    size: configurationProvider.getButtonSize(),
    iconSize: configurationProvider.getButtonIconSize(),
    margin: configurationProvider.getButtonMargin(),
  };
}

function getShortcutsData(configurationProvider) {
  return configurationProvider.getShortcuts().map(shortcut => ({
    uri: shortcut.buttonImageUrl,
    highlightedUri: shortcut.buttonImageHighlightedUrl,
    config: getButtonConfiguration(configurationProvider),
  }));
}

function getLayoutDimensions(configurationProvider) {
  return {
    rows: configurationProvider.getRowCount(),
    cols: configurationProvider.getColumnCount(),
  };
}

function mapStateToProps(state) {
  return {
    appState: { 'shoutem.core.configuration': configuration, ...state },
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    const { dispatch, appState } = props;
    this.configurationProvider = new ConfigurationReader(appState['shoutem.core.configuration']);

    console.warn(JSON.stringify(props.appState));

    this.state = {
      backgroundImage: {
        uri: getBackgroundImage(this.configurationProvider),
      },
      scrollType: this.configurationProvider.getScrollType(),
      layoutMargin: getLayoutMarginStyle(this.configurationProvider.getLayoutMargin()),
    };
  }

  renderShortcuts() {
    if (this.state.scrollType === 'continuous') {
      return (
        <ContinuousShortcuts
          layoutPosition={getLayoutPosition(this.configurationProvider)}
          shortcutsData={getShortcutsData(this.configurationProvider)}
        />
      );
    }

    return (
      <PagedShortcuts
        layoutPosition={getLayoutPosition(this.configurationProvider)}
        shortcutsData={getShortcutsData(this.configurationProvider)}
        dimensions={getLayoutDimensions(this.configurationProvider)}
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

export default connect(mapStateToProps)(Home);
