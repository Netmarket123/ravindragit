import React, {
  StyleSheet,
  View,
  ListView,
  PropTypes,
} from 'react-native';

import Shortcut from './Shortcut';
import buttonConfigShape from './ButtonConfigShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  buttonConfig: PropTypes.shape(buttonConfigShape),
  dimensions: PropTypes.shape({
    cols: PropTypes.number,
    rows: PropTypes.number,
  }),
  gridItems: PropTypes.array,
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

export default function ShortcutsGrid({
  layoutPosition,
  buttonConfig,
  gridItems,
  dimensions,
}) {
  function renderListItem(data) {
    return <Shortcut shortcutData={data} buttonConfig={buttonConfig} />;
  }

  function renderRow(dataSource, key) {
    const layoutStyle = getStyleForLayoutPosition(layoutPosition);

    return (
      <ListView
        contentContainerStyle={[styles.row, layoutStyle.row]}
        dataSource={dataSource}
        renderRow={renderListItem}
        key={key}
      />
    );
  }

  const dataSources = createDataSourcesFromData(gridItems, dimensions.cols);
  const layoutStyle = getStyleForLayoutPosition(layoutPosition);

  return (
    <View style={[styles.container, layoutStyle.container]}>
      {dataSources.map(renderRow)}
    </View>
  );
}

ShortcutsGrid.propTypes = propTypes;

