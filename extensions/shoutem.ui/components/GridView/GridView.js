import React, {
  View,
} from 'react-native';
import ListView from '../ListView/ListView';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

class MarginCalculator {
  constructor(style) {
    this.style = style;
    this.zeroMargin = 0;
  }

  getHorizontalMargin() {
    const style = this.style;
    if (!style) {
      return this.zeroMargin;
    }
    if (style.marginHorizontal) {
      return style.marginHorizontal;
    }
    return this.calculateHorizontalMargins(style);
  }

  /**
   *
   * @param style
   * @returns {number}
   */
  calculateHorizontalMargins(style) {
    const sideMargins = this.getSideMargins(style);

    if (this.hasNoMargins(sideMargins)) {
      return this.zeroMargin;
    } else if (this.hasLeftAndRightMargin(sideMargins)) {
      return this.sumUpSideMargins(sideMargins);
    }
    // margin only on one side, length === 1
    return this.transformSideMarginToHorizontal(sideMargins[0]);
  }

  getSideMargins(style) {
    return ['marginLeft', 'marginRight'].reduce((marginVals, marginProp) => {
      const marginVal = style[marginProp];
      if (marginVal) {
        marginVals.push(marginVal);
      }
      return marginVals;
    }, []);
  }

  hasNoMargins(sideMargins) {
    return sideMargins.length === 0;
  }

  hasLeftAndRightMargin(sideMargins) {
    return sideMargins.length === 2;
  }

  sumUpSideMargins(sideMargins) {
    return sideMargins[0] + sideMargins[1];
  }

  /**
   * Total horizontal margin value in case style has margin only on 1 side
   * is equal to half of that value. Look at it like taking half of that margin
   * and placing it on another side, which would mean left === right margin.
   *
   * @param sideMargin
   * @returns {number}
   */
  transformSideMarginToHorizontal(sideMargin) {
    return sideMargin / 2;
  }
}

/**
 * Used to provide predefined calculation function for grid columns and rows.
 * Every function must provide style object.
 */
const Dimensions = {
  /**
   * Provides column calculation functions
   */
  Column: {
    /**
     * Calculates column flex to match 100% width
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

/**
 * Return column flex style number or default value.
 *
 * @param columnStyle
 * @returns {*|number}
 */
function getColumnSpan(columnStyle = {}) {
  return columnStyle.flex || 1;
}

function getColumnHorizontalMargin(columnStyle) {
  return new MarginCalculator(columnStyle).getHorizontalMargin();
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
    marginHorizontal: remainingColumns * marginHorizontal,
  };
}

function renderCompensationColumn(remainingColumns, margin) {
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

  getItemColumnStyle(item, sectionId) {
    const { getItemColumnStyle, gridColumns, style } = this.props;
    const defaultItemColStyle = style.gridRow.gridItemCol;

    if (!getItemColumnStyle) {
      return defaultItemColStyle;
    }

    const itemColStyle = getItemColumnStyle(gridColumns, item, sectionId);

    return { ...defaultItemColStyle, ...itemColStyle };
  }

  getGroupRowStyle(sectionId) {
    const { getGroupRowStyle, style } = this.props;
    const defaultGroupRowStyle = style.gridRow.container;

    if (!getGroupRowStyle) {
      return defaultGroupRowStyle;
    }

    const groupRowStyle = getGroupRowStyle(sectionId);

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
    const columns = gridColumns;

    return getSectionId ?
      this.groupItemsWithSections(items, columns) :
      groupItems(items, columns);
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
    return group => {
      const sectionId = getGroupSectionId(group);
      const rowStyle = this.getGroupRowStyle(sectionId);
      let remainingColumns = gridColumns;
      let columnHorizontalMargin;

      const groupColumns = group.reduce((gridItems, item) => {
        const columnStyle = this.getItemColumnStyle(item, sectionId);
        columnHorizontalMargin = getColumnHorizontalMargin(columnStyle);
        remainingColumns = remainingColumns - getColumnSpan(columnStyle);

        gridItems.push(this.renderGroupItem(item, columnStyle));
        return gridItems;
      }, []);

      const compensationColumn = remainingColumns > 0 ?
        renderCompensationColumn(remainingColumns, columnHorizontalMargin) : null;

      return (
        <View style={rowStyle}>
          {groupColumns}
          {compensationColumn}
        </View>
      );
    };
  }

  renderGroupItem(item, columnStyle) {
    const { renderGridItem } = this.props;
    return (
      <View
        key={`gridItem_' + ${item.id}`}
        style={columnStyle}
      >
        {renderGridItem(item)}
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
        items={groupedItems}
        renderRow={renderRow}
      />
    );
  }
}

GridView.propTypes = {
  ...ListView.propTypes,
  gridColumns: React.PropTypes.number,
  renderGridItem: React.PropTypes.func.isRequired,
  getItemColumnStyle: React.PropTypes.func,
  getGroupRowStyle: React.PropTypes.func,
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
    gridItemCol: {
      flex: 1,
    },
  },
};

export default connectStyle('shoutem.ui.GridView', style)(GridView);
