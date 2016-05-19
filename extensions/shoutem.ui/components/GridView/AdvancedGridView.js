import React, {
  View,
} from 'react-native';
import AdvancedListView from '../ListView/AdvancedListView';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

function createRenderRow(renderGridItem, style, columns) {
  return function renderRow(items) {
    const columnsDiff = columns - items.length;
    const gridItemStyle = items.featured ? style.gridFeaturedItemWrapper : style.gridItemWrapper;
    return (
      <View style={style.gridRow}>
        {
          items.reduce((gridItems, item) => {
            gridItems.push(
              <View key={`gridItem_' + ${item.id}`} style={gridItemStyle}>
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

function AdvancedGridView(props) {
  const columns = props.gridColumns || DEFAULT_ITEMS_GROUP_SIZE;
  return (
    <AdvancedListView
      {...props}
      items={groupItems(props.items, columns)}
      renderRow={createRenderRow(props.renderGridItem, props.style, columns)}
    />
  );
}

AdvancedGridView.propTypes = Object.assign({}, AdvancedListView.propTypes, {
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
    flexDirection: 'row',
  },
  gridItemWrapper: {
    flex: 1,
  },
  gridFeaturedItemWrapper: {
    flex: 1,
  },
};

export default connectStyle('shoutem.ui.AdvancedGridView', style)(AdvancedGridView);
