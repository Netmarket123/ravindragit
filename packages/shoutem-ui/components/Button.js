import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Button(props) {
  // The underlayColor is not a valid RN style
  // property, so we have to unset it here.
  const style = {
    ...props.style,
  };
  delete style.underlayColor;

  return (
    <TouchableOpacity
      {...props}
      style={style}
      underlayColor={props.style.underlayColor}
    >
      {props.children}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
};

const StyledButton = connectStyle('shoutem.ui.Button', {})(Button);
export {
  StyledButton as Button,
};
