import React from 'react';
import {
  View,
} from 'react-native';
import { ListView } from '../ListView';
import MarginCalculator from './lib/MarginCalculator';
import { connectStyle } from '@shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

/**
 * Used to provide predefined calculation function for grid cells and rows.
 * Every function must provide style object.
 */
const Dimensions = {
  /**
   * Provides cell calculation functions
   */
  Cell: {
    /**
     * Calculates cell flex to match 100% width
     * @param gridColumns
     */
    stretch: gridColumns => ({ flex: gridColumns }),
  },
  /**
   * Provides row calculation functions
   */
  Row: {},
};

/**
 * Return last items group length.
 *
 * @param groupedItems - [[], [] ,[]]
 * @returns {number}
 */
function getCurrentGroupLength(groupedItems) {
  const currentGroupIndex = groupedItems.length - 1;
  const currentGroup = groupedItems[currentGroupIndex];
  return currentGroup ? currentGroup.length : 0;
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

function createCellSettings(rowSettings, itemIndex) {
  return {
    ...rowSettings,
    itemIndex,
  };
}

function createRowSettings(sectionId, sectionIndex, rowIndex, gridColumns, itemsGroup) {
  return {
    sectionId,
    sectionIndex,
    rowIndex,
    gridColumns,
    groupLength: itemsGroup.length,
  };
}

/**
 * Return cell flex style number or default value.
 *
 * @param cellStyle
 * @returns {*|number}
 */
function getCellSpan(cellStyle = {}) {
  return cellStyle.flex || 1;
}

function getCellHorizontalMargin(cellStyle) {
  return new MarginCalculator(cellStyle).getHorizontalMargin();
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

function createCompensationStyle(remainingColumns, marginHorizontal) {
  return {
    flex: remainingColumns,
    // horizontal margin is automatically applied on both sides
    marginHorizontal: remainingColumns * marginHorizontal,
  };
}

function renderCompensationCell(remainingColumns, margin) {
  return <View style={createCompensationStyle(remainingColumns, margin)} />;
}

class GridView extends React.Component {
  // Predefined ColSpan options for items to use for ColSpan
  static Dimensions = Dimensions;

  static defaultProps = {
    gridColumns: DEFAULT_ITEMS_GROUP_SIZE,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      groupedItems: [],
    };
  }

  componentWillMount() {
    const { data } = this.props;
    if (data && data.length > 0) {
      this.updateGroupedItemsState(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (nextProps.data !== data) {
      this.updateGroupedItemsState(nextProps.data);
    }
  }

  getItemCellStyle(item, settings) {
    const { getItemCellStyle, style } = this.props;
    const defaultItemCellStyle = style.gridRow.gridItemCell;

    if (!getItemCellStyle) {
      return defaultItemCellStyle;
    }

    const itemColStyle = getItemCellStyle(item, settings);

    return { ...defaultItemCellStyle, ...itemColStyle };
  }

  getGroupRowStyle(rowSettings) {
    const { getGroupRowStyle, style } = this.props;
    const defaultGroupRowStyle = style.gridRow.container;

    if (!getGroupRowStyle) {
      return defaultGroupRowStyle;
    }

    const groupRowStyle = getGroupRowStyle(rowSettings);

    return { ...defaultGroupRowStyle, ...groupRowStyle };
  }

  groupItemsWithSections(items, itemsPerGroup) {
    const { getSectionId } = this.props;
    if (!getSectionId) {
      throw Error('Can not group items with sections, missing getSectionId prop.');
    }
    let prevSectionId;
    return items.reduce((groupedItems, item) => {
      const sectionId = getSectionId(item);
      const currentGroupLength = getCurrentGroupLength(groupedItems);

      if (prevSectionId !== sectionId || currentGroupLength === itemsPerGroup) {
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
    const cells = gridColumns;

    return getSectionId ?
      this.groupItemsWithSections(items, cells) :
      groupItems(items, cells);
  }

  updateGroupedItemsState(items) {
    this.setState({ groupedItems: this.groupItems(items) });
  }

  /**
   * Create renderRow function for ListView. Renders group of items into row.
   * It work with or without sections. If sections are not enabled, sectionId
   * is undefined for every group.
   *
   * @returns {function()}
   */
  createRenderRow() {
    const { gridColumns } = this.props;
    /**
     * GridView renderRow function, used to pass formatted arguments to renderGridCell.
     *
     * @param itemsGroup {[]} - grouped items for row
     * @param sectionIndex {number} - section index (optional)
     * @param rowIndex {number} - index of itemsGroup in section
     */
    return (itemsGroup, sectionIndex, rowIndex) => {
      const sectionId = getGroupSectionId(itemsGroup);
      // TODO(Braco) - extract row and cell to class
      const rowSettings =
        createRowSettings(sectionId, sectionIndex, rowIndex, gridColumns, itemsGroup);
      const rowStyle = this.getGroupRowStyle(rowSettings);
      let remainingCells = gridColumns;
      let cellHorizontalMargin;

      const groupCells = itemsGroup.reduce((gridItems, item, itemIndex) => {
        const cellSettings = createCellSettings(rowSettings, itemIndex);
        const cellStyle = this.getItemCellStyle(item, cellSettings);
        // We are compensating margin like it is the same applied on every grid cell
        cellHorizontalMargin = getCellHorizontalMargin(cellStyle);
        remainingCells = remainingCells - getCellSpan(cellStyle);

        gridItems.push(this.renderGroupItem(item, cellStyle, cellSettings));
        return gridItems;
      }, []);

      // Used to align last row item with item above
      // in case row have less items then predicted cells
      const compensationCell = remainingCells > 0 ?
        renderCompensationCell(remainingCells, cellHorizontalMargin) : null;

      return (
        <View style={rowStyle}>
          {groupCells}
          {compensationCell}
        </View>
      );
    };
  }

  renderGroupItem(item, cellStyle, cellSettings) {
    const { renderGridCell } = this.props;
    return (
      <View
        key={`gridItem_' + ${item.id}`}
        style={cellStyle}
      >
        {renderGridCell(item, cellSettings)}
      </View>
    );
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
        data={groupedItems}
        renderRow={renderRow}
      />
    );
  }
}

GridView.propTypes = {
  ...ListView.propTypes,
  gridColumns: React.PropTypes.number,
  renderGridCell: React.PropTypes.func.isRequired,
  getItemCellStyle: React.PropTypes.func,
  getGroupRowStyle: React.PropTypes.func,
};

const style = {
  header: {
    container: {},
    search: {},
  },
  listContent: {},
  list: {},
  gridRow: {
    container: {
      flexDirection: 'row',
    },
    gridItemCell: {
      flex: 1,
    },
  },
};

const StyledGridView = connectStyle('shoutem.ui.GridView', style)(GridView);

export {
  StyledGridView as GridView,
};
