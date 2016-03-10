import React, {
  Component,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import PagedShortcuts from './PagedShortcuts.js';
import ContinuousShortcuts from './ContinuousShortcuts';
import ConfigurationReader from './ConfigurationReader';

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

const layoutPositionStyles = {
  topLeft: {
    verticalAlignment: {
      alignSelf: 'flex-start',
    },
    horizontalAlignment: {
      alignSelf: 'flex-start',
    },
  },
  topCenter: {
    verticalAlignment: {
      alignSelf: 'flex-start',
    },
    horizontalAlignment: {
      alignSelf: 'center',
    },
  },
  topRight: {
    verticalAlignment: {
      alignSelf: 'flex-start',
    },
    horizontalAlignment: {
      alignSelf: 'flex-end',
    },
  },
  middleLeft: {
    verticalAlignment: {
      alignSelf: 'center',
    },
    horizontalAlignment: {
      alignSelf: 'flex-start',
    },
  },
  middleCenter: {
    verticalAlignment: {
      alignSelf: 'center',
    },
    horizontalAlignment: {
      alignSelf: 'center',
    },
  },
  middleRight: {
    verticalAlignment: {
      alignSelf: 'center',
    },
    horizontalAlignment: {
      alignSelf: 'flex-end',
    },
  },
  bottomLeft: {
    verticalAlignment: {
      alignSelf: 'flex-end',
    },
    horizontalAlignment: {
      alignSelf: 'flex-start',
    },
  },
  bottomCenter: {
    verticalAlignment: {
      alignSelf: 'flex-end',
    },
    horizontalAlignment: {
      alignSelf: 'center',
    },
  },
  bottomRight: {
    verticalAlignment: {
      alignSelf: 'flex-end',
    },
    horizontalAlignment: {
      alignSelf: 'flex-end',
    },
  },
};

const configurationReader = new ConfigurationReader();

function getBackgroundImage() {
  return configurationReader.getHomeScreenBackgroundImageWide() ||
    configurationReader.getHomeScreenBackgroundImage();
}

function getLayoutPosition() {
  return layoutPositionStyles[configurationReader.getLayoutPosition()];
}

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      backgroundImage: {
        uri: getBackgroundImage(),
      },
      scrollType: configurationReader.getScrollType(),
    };
  }

  renderShortcuts() {
    if (this.state.scrollType === 'continuous') {
      return (
        <ContinuousShortcuts layoutPositionStyle={getLayoutPosition()}/>
      );
    }

    return <PagedShortcuts layoutPositionStyle={getLayoutPosition()}/>;
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

