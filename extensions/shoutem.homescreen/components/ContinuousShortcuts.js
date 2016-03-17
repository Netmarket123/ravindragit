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
      alignSelf: layoutPosition.verticalAlignment,
    },
    contentContainer: {
      alignSelf: layoutPosition.horizontalAlignment,
    },
  };
}

export default class ContinuousShortcuts extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.shortcutsData),
      style: getStyleForLayoutPosition(props.layoutPosition),
    };
  }

  renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  render() {
    return (
      <ListView style={[styles.list, this.state.style.list]}
        contentContainerStyle={[styles.contentContainer, this.state.style.contentContainer]}
        dataSource={this.state.dataSource}
        renderRow={this.renderListItem}
      />
    );
  }
}

ContinuousShortcuts.propTypes = propTypes;

