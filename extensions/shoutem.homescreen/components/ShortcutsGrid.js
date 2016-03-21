import React, {
  Component,
  StyleSheet,
  View,
  ListView,
} from 'react-native';

import Shortcut from './Shortcut';

const propTypes = {
  layoutPosition: React.PropTypes.shape({
    verticalAlignment: React.PropTypes.string,
    horizontalAlignment: React.PropTypes.string,
  }),
  dimensions: React.PropTypes.shape({
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
  }),
  gridItems: React.PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

// TODO(Vladimir) - extract to mixin/decorator
function splitIntoPages(items, pageSize) {
  return items.reduce((currentPages, item) => {
    let lastPage = currentPages.find((page) => page.length < pageSize);

    if (!lastPage) {
      lastPage = [];
      currentPages.push(lastPage);
    }

    lastPage.push(item);

    return currentPages;
  }, [[]]);
}

function getStyleForLayoutPosition(layoutPosition) {
  return {
    container: {
      alignItems: layoutPosition.horizontalAlignment,
    },
  };
}

function createDataSourcesFromData(data, nCols) {
  const rows = splitIntoPages(data, nCols);
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  return rows.map((row) => ds.cloneWithRows(row));
}

export default class ShortcutsGrid extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  renderRow(dataSource, key) {
    const layoutStyle = getStyleForLayoutPosition(this.props.layoutPosition);

    return (
      <ListView contentContainerStyle={[styles.row, layoutStyle.row]}
        dataSource={dataSource}
        renderRow={this.renderListItem}
        key={key}
      />
    );
  }

  render() {
    const { gridItems, dimensions, layoutPosition } = this.props;
    const dataSources = createDataSourcesFromData(gridItems, dimensions.cols);
    const layoutStyle = getStyleForLayoutPosition(layoutPosition);

    return (
      <View style={[styles.container, layoutStyle.container]}>
        {dataSources.map(this.renderRow)}
      </View>
    );
  }
}

ShortcutsGrid.propTypes = propTypes;

