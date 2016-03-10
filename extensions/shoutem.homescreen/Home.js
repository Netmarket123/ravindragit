import React, {
  Component,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import PagedShortcuts from './PagedShortcuts.js';
import ContinuousShortcuts from './ContinuousShortcuts';
import configurationProvider from './ConfigurationProvider';

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

function getBackgroundImage() {
  return configurationProvider.getHomeScreenBackgroundImageWide() ||
    configurationProvider.getHomeScreenBackgroundImage();
}

function getLayoutPosition() {
  return layoutAlignments[configurationProvider.getLayoutPosition()];
}

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      backgroundImage: {
        uri: getBackgroundImage(),
      },
      scrollType: configurationProvider.getScrollType(),
    };
  }

  renderShortcuts() {
    if (this.state.scrollType === 'continuous') {
      return <ContinuousShortcuts layoutPosition={getLayoutPosition()}/> ;
    }

    return <PagedShortcuts layoutPosition={getLayoutPosition()}/>;
  }

  render() {
    return (
      <Image source={ this.state.backgroundImage } style={styles.backgroundImage}>
        <View style={styles.content}>
          {this.renderShortcuts()}
        </View>
      </Image>
    );
  }
}

