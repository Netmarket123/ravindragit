import React, {
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import NativeVideo from './NativeVideo';
import WebViewVideo from './WebViewVideo';
import VideoSourceReader from './VideoSourceReader';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Renders a Video based on the source type
 * if source is an url to a web player the
 * it is displayed in a WebView, if not
 * a native video player plays the video.
 *
 * @returns {*}
 */
export default function Video({
  width,
  height,
  source,
}) {
  const sourceReader = new VideoSourceReader(source);
  let VideoElement = NativeVideo;

  if (sourceReader.isWebVideo()) {
    VideoElement = WebViewVideo;
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <VideoElement
        source={{ uri: sourceReader.getUrl() }}
        width={width}
        height={height}
      />
   </View>
  );
}

Video.propTypes = propTypes;

