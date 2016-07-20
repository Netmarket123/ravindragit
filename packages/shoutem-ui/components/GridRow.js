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

// eslint-disable-next-line arrow-body-style
GridRow.groupData = (data, shouldCreateNewRow) => {
  return _.reduce(data, (rows, element) => {
    const lastRow = _.last(rows);
    if (shouldCreateNewRow(element, lastRow)) {
      rows.push([element]);
    } else {
      lastRow.push(element);
    }

    return rows;
  }, []);
};

const StyledGridRow = connectStyle('shoutem.ui.GridRow', {})(GridRow);

export {
  StyledGridRow as GridRow,
};
