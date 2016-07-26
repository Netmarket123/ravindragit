import React from 'react';
import { View } from './View';

import { connectStyle } from '@shoutem/theme';

function Divider(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Divider.propTypes = {
  ...View.propTypes,
};

const StyledDivider = connectStyle('shoutem.ui.Divider', {})(Divider);

export {
  StyledDivider as Divider,
};
