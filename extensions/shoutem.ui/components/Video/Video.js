import React, {
  View,
  PropTypes,
} from 'react-native';

import { connectStyle } from 'shoutem/theme';

import NativeVideo from './NativeVideo';
import WebViewVideo from './WebViewVideo';
import VideoSourceReader from './VideoSourceReader';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.string,
};

const style = {
  container: {
    flex: 1,
  },
};

/**
 * Renders a Video based on the source type
 * if source is an url to a web player the
 * it is displayed in a WebView, if not
 * a native video player plays the video.
 *
 * @returns {*}
 */
function Video({
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
    <View style={[style.container, { width, height }]}>
      <VideoElement
        source={{ uri: sourceReader.getUrl() }}
        width={width}
        height={height}
      />
   </View>
  );
}

Video.propTypes = propTypes;

export default connectStyle('shoutem.ui.Video', style)(Video);
