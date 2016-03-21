import React, {
  Component,
  PropTypes,
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

export default class ContinuousScroller extends Component {
  render() {
    if (this.props.layoutType === 'grid') {
      return (
        <ShortcutsGrid gridItems={this.props.shortcutsData}
          dimensions={this.props.dimensions}
          layoutPosition={this.props.layoutPosition}
        />
      );
    }

    return (
      <ShortcutsList
        layoutPosition={this.props.layoutPosition}
        shortcutsData={this.props.shortcutsData}
      />
    );
  }
}

ContinuousScroller.propTypes = propTypes;

