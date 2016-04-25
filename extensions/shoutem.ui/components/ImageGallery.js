import React, {
  View,
  PropTypes,
  ScrollView,
  ViewPagerAndroid,
  Dimensions,
  Platform,
} from 'react-native';

import ImagePreview from './ImagePreview';
import { connectStyle } from 'shoutem/theme';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  sources: PropTypes.arrayOf(PropTypes.string),
};

const screenWidth = Dimensions.get('window').width;

const styles = {
  item: {
    flex: 1,
    width: screenWidth,
  },
};

function ImagePreviewPage({
  source,
  height,
  width,
}, key) {
  return (
    <View
      style={styles.item}
      key={key}
    >
      <ImagePreview
        source={source}
        width={width}
        height={height}
      />
    </View>
  );
}

ImagePreviewPage.propTypes = ImagePreview.propTypes;

function Gallery({
  sources,
  width,
  height,
}) {
  if (Platform.OS === 'android') {
    return (
      <ViewPagerAndroid
        style={{ height:500 }}
        initialPage={0}
      >
        {sources.map(source => ({ source: { uri: source }, width, height })).map(ImagePreviewPage)}
      </ViewPagerAndroid>
    );
  }

  console.warn('nije android');

  return (
    <ScrollView
      pagingEnabled
      horizontal
    >
      {sources.map(source => ({ source: { uri: source }, width, height })).map(ImagePreviewPage)}
    </ScrollView>
  );
}

Gallery.propTypes = propTypes;

export default connectStyle('shoutem.ui.Gallery', styles)(Gallery);
