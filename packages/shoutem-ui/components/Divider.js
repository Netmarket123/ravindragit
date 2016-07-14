import React from 'react';
import { StyleSheet } from 'react-native';
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

const style = {
  '.line': {
    height: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(242, 242, 242)',
  },

  alignSelf: 'stretch',
  height: 20,
};

const StyledDivider = connectStyle('shoutem.ui.Divider', style)(Divider);

export {
  StyledDivider as Divider,
};
