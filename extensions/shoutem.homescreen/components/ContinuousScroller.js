import React, {
  Component,
  PropTypes,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import ShortcutsList from './ShortcutsList';
import ShortcutsGrid from './ShortcutsGrid';
import shortcutDataShape from './ShortcutDataShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
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

function getStyleForLayoutPosition(layoutPosition) {
  return {
    contentContainer: {
      alignSelf: layoutPosition.verticalAlignment,
    },
  };
}

export default class ContinuousScroller extends Component {
  render() {
    if (this.props.layoutType === 'grid') {
      return (
      <ScrollView
        style={styles.container}
contentContainerStyle={[styles.contentContainer, getStyleForLayoutPosition(this.props.layoutPosition).contentContainer]}
>
        <ShortcutsGrid gridItems={this.props.shortcutsData}
          dimensions={this.props.dimensions}
          layoutPosition={this.props.layoutPosition}
        />
      </ScrollView>
      );
    }

    return (
      <ScrollView
        style={styles.container}
contentContainerStyle={[styles.contentContainer, getStyleForLayoutPosition(this.props.layoutPosition).contentContainer]}
>
        <ShortcutsList
          layoutPosition={this.props.layoutPosition}
          shortcutsData={this.props.shortcutsData}
        />
      </ScrollView>
    );
  }
}

ContinuousScroller.propTypes = propTypes;

