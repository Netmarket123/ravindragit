import React, {
  PropTypes,
} from 'react';

import {
  View,
  WebView,
} from 'react-native';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
  style: PropTypes.object,
};

/**
 * Displays a HTML Video player from the specified source
 * in a WebView
 *
 * @returns {*}
 */
function WebViewVideo({
  width,
  height,
  source,
  style,
}) {
  return (
    <View style={[style.container, { width, height }]}>
      <WebView
        source={source}
      />
    </View>
  );
}

WebViewVideo.propTypes = propTypes;

export { WebViewVideo };
