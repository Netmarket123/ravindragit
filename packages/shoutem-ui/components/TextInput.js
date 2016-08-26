import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function TextInput(props) {
  const style = {
    ...props.style,
  };
  delete style.placeholderTextColor;
  delete style.selectionColor;
  return (
    <RNTextInput
      {...props}
      style={style}
      placeholderTextColor={props.style.placeholderTextColor}
      selectionColor={props.style.selectionColor}
    />
  );
}

TextInput.propTypes = {
  ...RNTextInput.propTypes,
};

const StyledTextInput = connectStyle('shoutem.ui.TextInput')(TextInput);

export {
  StyledTextInput as TextInput,
};
