import React, {
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import NativeVideo from './NativeVideo';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Renders a Video based on the source type
 * Currently only direct links are supported
 *
 * TODO(Vladimir): support YouTube and Vimeo source types
 * TODO(Vladimir): display a play button and a poster overlay
 *
 * @returns {*}
 */
export default function Video({
  width,
  height,
  source,
}) {
  return (
    <View style={[styles.container, { width, height }]}>
      <NativeVideo
        source={source}
        width={width}
        height={height}
      />
    </View>
  );
}

Video.propTypes = propTypes;

