import React, {
  Component,
  ListView,
  StyleSheet,
  PropTypes,
} from 'react-native';

import Shortcut from './Shortcut';
import shortcutDataShape from './ShortcutDataShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

function getStyleForLayoutPosition(layoutPosition) {
  return {
    list: {
      alignSelf: layoutPosition.horizontalAlignment,
    },
  };
}

function createDataSourceFromData(data) {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return ds.cloneWithRows(data);
}

export default class ShortcutsList extends Component {
  renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  render() {
    const layoutPositionStyle = getStyleForLayoutPosition(this.props.layoutPosition);
    return (
      <ListView style={[styles.list, layoutPositionStyle.list]}
        contentContainerStyle={styles.contentContainer}
        dataSource={createDataSourceFromData(this.props.shortcutsData)}
        renderRow={this.renderListItem}
      />
    );
  }
}

ShortcutsList.propTypes = propTypes;

