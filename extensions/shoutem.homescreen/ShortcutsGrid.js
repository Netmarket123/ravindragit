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

export default class ShortcutsGrid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const gridItems = this.props.gridItems;
    const nCols = this.props.dimensions.cols;
    const rows = splitIntoPages(gridItems, nCols);

    this.state = {
      dataSources: rows.map((row) => ds.cloneWithRows(row)),
      dimensions: this.props.dimensions,
      style: getStyleForLayoutPosition(this.props.layoutPosition),
    };

    if (this.state.dimensions.cols === 1) {
      this.state.style.row.flexDirection = 'column';
    }

    this._renderRow = this._renderRow.bind(this);
  }

  _renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  _renderRow(dataSource, key) {
    return (
      <ListView contentContainerStyle={[styles.row, this.state.style.row]}
        dataSource={dataSource}
        renderRow={this._renderListItem}
        key={key}
      />
    );
  }

  render() {
    return (
      <View style={[styles.container, this.state.style.container]}>
        {this.state.dataSources.map(this._renderRow)}
      </View>
    );
  }
}

ShortcutsGrid.propTypes = propTypes;

