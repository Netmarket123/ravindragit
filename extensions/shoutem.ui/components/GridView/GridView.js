import React, {
  View,
} from 'react-native';
import ListView from '../ListView/ListView';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

function createRenderRow(renderGridItem, style, columns) {
  return function renderRow(items) {
    const columnsDiff = columns - items.length;
    const gridRowStyle = items.featured ? style.featuredGridRow : style.gridRow;
    // Featured row (view) must have flex direction column so child can center text properly (bug?)
    // Single grid item wrapper is used to set margin between each grid item and so last item
    // if single in row can be aligned properly with others.
    // TODO(Braco) - calculate last item margin fix
    return (
      <View style={gridRowStyle.container}>
        {
          items.reduce((gridItems, item) => {
            gridItems.push(
              <View key={`gridItem_' + ${item.id}`} style={gridRowStyle.gridItemContainer}>
                {renderGridItem(item)}
              </View>
            );
            return gridItems;
          }, [])
        }
        {!items.featured && columnsDiff > 0 ? <View style={{ flex: columnsDiff }} /> : []}
      </View>);
  };
}

function groupItems(items, itemsPerGroup = DEFAULT_ITEMS_GROUP_SIZE) {
  // featuredItemsGroup is first list in groupedItems list
  const featuredItemsGroup = [];
  featuredItemsGroup.featured = true;
  return items.reduce((groupedItems, item, index) => {
    if (item.featured) {
      groupedItems[0].push(item);
    } else {
      if ((index - groupedItems[0].length) % itemsPerGroup === 0) {
        groupedItems.push([]);
      }
      groupedItems[(groupedItems.length - 1)].push(item);
    }
    return groupedItems;
  }, [featuredItemsGroup]);
}

function GridView(props) {
  const columns = props.gridColumns || DEFAULT_ITEMS_GROUP_SIZE;
  return (
    <ListView
      {...props}
      items={groupItems(props.items, columns)}
      renderRow={createRenderRow(props.renderGridItem, props.style, columns)}
    />
  );
}

GridView.propTypes = Object.assign({}, ListView.propTypes, {
  gridColumns: React.PropTypes.number,
  renderGridItem: React.PropTypes.func,
});

const style = {
  header: {
    container: {},
    search: {},
  },
  list: {},
  gridRow: {
    container: {
      flexDirection: 'row',
    },
    gridItemContainer: {
      flex: 1,
    },
  },
  featuredGridRow: {
    container: {
      flexDirection: 'column',
    },
    gridItemContainer: {
      flex: 1,
    },
  },
};

export default connectStyle('shoutem.ui.GridView', style)(GridView);
