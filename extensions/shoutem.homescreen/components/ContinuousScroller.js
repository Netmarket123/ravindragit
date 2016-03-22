import React, {
  Component,
  PropTypes,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import ShortcutsGrid from './ShortcutsGrid';
import shortcutDataShape from './ShortcutDataShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
  dimensions: PropTypes.shape({
    cols: PropTypes.number,
    rows: PropTypes.number,
  }),
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
  },
});

function getStyleForContentLayoutPosition(layoutPosition) {
  return {
    alignSelf: layoutPosition.verticalAlignment,
  };
}

export default class ContinuousScroller extends Component {
  render() {
    const contentContainerPosition = getStyleForContentLayoutPosition(this.props.layoutPosition);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, contentContainerPosition]}
      >
        <ShortcutsGrid gridItems={this.props.shortcutsData}
          dimensions={this.props.dimensions}
          layoutPosition={this.props.layoutPosition}
        />
      </ScrollView>
    );
  }
}

ContinuousScroller.propTypes = propTypes;

