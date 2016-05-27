import React, {
  View,
} from 'react-native';
import ListView from '../ListView/ListView';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;
const DEFAULT_ITEM_COL_SPAN = 1;

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

function groupItems(items, itemsPerGroup) {
  return items.reduce((groupedItems, item, index) => {
    if ((index % itemsPerGroup) === 0) {
      groupedItems.push([]);
    }

    const lastGroupIndex = groupedItems.length - 1;
    groupedItems[lastGroupIndex].push(item);

    return groupedItems;
  }, []);
}

class GridView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      groupedItems: [],
    };
  }

  componentWillMount() {
    const { items } = this.props;
    if (items && items.length > 0) {
      this.updateGroupedItemsState(items);
    }
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items !== items) {
      this.updateGroupedItemsState(nextProps.items);
    }
    return true;
  }

  getItemColSpan(item) {
    return this.props.getItemColSpan ? this.props.getItemColSpan(item) : DEFAULT_ITEM_COL_SPAN;
  }

  groupItemsWithSelection(items, itemsPerGroup) {
    const { getSectionId } = this.props;
    if (!getSectionId) {
      throw Error('Can not group items with sections, missing getSectionId prop.');
    }
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

  groupItems(items) {
    const {
      getSectionId,
      gridColumns,
    } = this.props;
    const columns = gridColumns || DEFAULT_ITEMS_GROUP_SIZE;

    return getSectionId ?
      this.groupItemsWithSelection(items, columns) :
      groupItems(items, columns);
  }

  updateGroupedItemsState(items) {
    this.setState({ groupedItems: this.groupItems(items) });
  }

  createRenderRow() {
    const { style, renderGridItem, gridColumns } = this.props;
    const columns = gridColumns || DEFAULT_ITEMS_GROUP_SIZE;
    return function renderRow(group) {
      const columnsDiff = columns - group.length;
      const gridRowStyle = style.gridRow;
      const shouldRenderGridDiff = columnsDiff > 0;
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

      return itemView;
    };
  }

  render() {
    const {
      getSectionId,
    } = this.props;
    const { groupedItems } = this.state;
    const renderRow = this.createRenderRow();

    // TODO(Braco) - explain getSectionId override
    return (
      <ListView
        {...this.props}
        getSectionId={getSectionId && getGroupSectionId}
        items={groupedItems}
        renderRow={renderRow}
      />
    );
  }
}

GridView.propTypes = {
  ...ListView.propTypes,
  gridColumns: React.PropTypes.number,
  renderGridItem: React.PropTypes.func,
  getItemColSpan: React.PropTypes.func,
};

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
