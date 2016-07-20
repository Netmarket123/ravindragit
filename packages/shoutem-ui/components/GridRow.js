import React, { Children } from 'react';
import { View as RNView } from 'react-native';
import _ from 'lodash';

import { View } from './View';
import { connectStyle } from '@shoutem/theme';

/**
 * Renders empty placeholder views to fill any empty space
 * left by missing views within a row. This is necessary so that
 * the items in a row remain aligned correctly.
 *
 * @param count Number of placeholders to render
 * @returns {*} Placeholder views
 */
function renderPlaceholderViews(count) {
  return _.times(count, (index) => (<View key={`placeholder-${index}`} />));
}

function GridRow(props) {
  const { children, columns } = props;
  const missingElementsCount = columns - Children.count(children);

  return (
    <RNView {...props}>
      {children}
      {renderPlaceholderViews(missingElementsCount)}
    </RNView>
  );
}

GridRow.propTypes = {
  columns: React.PropTypes.number.isRequired,
  ...RNView.propTypes,
};

/* eslint-disable no-param-reassign */
/**
 * Groups data into rows for rendering in grid views.
 * Elements may need more than one column in the grid,
 * a weight can be assigned to each element that determines
 * the number of columns it should occupy.
 *
 * @param data The data elements to group.
 * @param columns The number of columns of the grid.
 * @param getElementWeight Optional function that returns the
 *   weight of a single element. Each element has a weight of
 *   1 by default.
 * @returns {Array} An array of rows, each row is an array of
 *   data elements.
 */
GridRow.groupByRows = (data, columns, getElementWeight = _.constant(1)) => {
  const groupedData = _.reduce(data, (result, element) => {
    let currentRow = _.last(result.rows);
    if (currentRow === undefined) {
      currentRow = [];
      result.rows.push(currentRow);
    }

    const elementWeight = getElementWeight(element);
    if (result.currentRowWeight + elementWeight <= columns) {
      result.currentRowWeight += elementWeight;
      currentRow.push(element);
    } else {
      result.currentRowWeight = elementWeight;
      currentRow = [element];
      result.rows.push(currentRow);
    }

    return result;
  }, { currentRowWeight: 0, rows: []});

  return groupedData.rows;
};

const StyledGridRow = connectStyle('shoutem.ui.GridRow', {})(GridRow);

export {
  StyledGridRow as GridRow,
};
