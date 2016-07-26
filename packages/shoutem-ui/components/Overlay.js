import React from 'react';
import { View } from './View';

import { connectStyle } from '@shoutem/theme';

function Overlay(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Overlay.propTypes = {
  ...View.propTypes,
};

const StyledTag = connectStyle('shoutem.ui.Overlay', {})(Overlay);

export {
  StyledTag as Overlay,
};
