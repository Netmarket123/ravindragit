import React, {
  PropTypes,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import ShortcutsGrid from './ShortcutsGrid';
import shortcutDataShape from './ShortcutDataShape';
import buttonConfigShape from './ButtonConfigShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
  buttonConfig: PropTypes.shape(buttonConfigShape),
  dimensions: PropTypes.shape({
    cols: PropTypes.number,
    rows: PropTypes.number,
  }),
};

/*
 *  TODO(Vladimir) - decide if these dimensions need to be provided
 *  dynamically based on the scroll direction
 */
const { height, width } = Dimensions.get('window');

// Read window dimensions to set a fixed ScrollView size and enable scrolling
const styles = StyleSheet.create({
  container: {
    height,
    width,
    flex: 1,
    flexDirection: 'row',
  },
});

function getStyleForContentLayoutPosition(layoutPosition) {
  return {
    alignSelf: layoutPosition.verticalAlignment,
  };
}

export default function ContinuousScroller({
  shortcutsData,
  layoutPosition,
  dimensions,
  buttonConfig,
}) {
  const contentContainerPosition = getStyleForContentLayoutPosition(layoutPosition);
  return (
    <ScrollView
      style={styles.container}
      directionalLockEnabled
      contentContainerStyle={contentContainerPosition}
    >
      <ShortcutsGrid gridItems={shortcutsData}
        dimensions={dimensions}
        layoutPosition={layoutPosition}
        buttonConfig={buttonConfig}
      />
    </ScrollView>
  );
}

ContinuousScroller.propTypes = propTypes;

