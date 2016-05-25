import React, {
  View,
} from 'react-native';
import ListView from '../ListView/ListView';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

function groupItems(items, itemsPerGroup = DEFAULT_ITEMS_GROUP_SIZE) {
  return items.reduce((groupedItems, item, index) => {
    if ((index % itemsPerGroup) === 0) {
      groupedItems.push([]);
    }

    const lastGroupIndex = groupedItems.length - 1;
    groupedItems[lastGroupIndex].push(item);

    return groupedItems;
  }, []);
}

function groupItemsWithSelection(items, itemsPerGroup = DEFAULT_ITEMS_GROUP_SIZE, getSectionId) {
  let prevSectionId;
  return items.reduce((groupedItems, item, index) => {
    const sectionId = getSectionId(item);

    if (prevSectionId !== sectionId || (index % itemsPerGroup) === 0) {
      const group = [];
      group.sectionId = sectionId;
      groupedItems.push(group);
    }

    prevSectionId = sectionId;

    const lastGroupIndex = groupedItems.length - 1;
    groupedItems[lastGroupIndex].push(item);

    return groupedItems;
  }, []);
}

/**
 * Returns group section id.
 * GridView works with groups so it needs to return section id from group and not item.
 *
 * @param group {[]}
 * @returns {*}
 */
function getGroupSectionId(group) {
  return group.sectionId;
}

function createRenderRow(renderGridItem, style, columns) {
  let prevSectionId;
  return function renderRow(group) {
    const columnsDiff = columns - group.length;
    const sectionId = getGroupSectionId(group);
    const gridRowStyle = style.gridRow;
    const shouldRenderGridDiff = prevSectionId === sectionId && columnsDiff > 0;
    const itemView = (
      <View style={gridRowStyle.container}>
        {
          group.reduce((gridItems, item) => {
            gridItems.push(
              <View key={`gridItem_' + ${item.id}`} style={gridRowStyle.gridItemContainer}>
                {renderGridItem(item)}
              </View>
            );
            return gridItems;
          }, [])
        }
        {shouldRenderGridDiff ? <View style={{ flex: columnsDiff }}> TEst </View> : null}
      </View>
    );

    prevSectionId = sectionId;

    return itemView;
  };
}

function GridView(props) {
  const columns = props.gridColumns || DEFAULT_ITEMS_GROUP_SIZE;
  const getSectionId = props.getSectionId && getGroupSectionId;
  const renderRow = createRenderRow(props.renderGridItem, props.style, columns);
  const items = props.getSectionId ?
    groupItemsWithSelection(props.items, columns, props.getSectionId) :
    groupItems(props.items, columns);
  return (
    <ListView
      {...props}
      getSectionId={getSectionId}
      items={items}
      renderRow={renderRow}
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
};

export default connectStyle('shoutem.ui.GridView', style)(GridView);
