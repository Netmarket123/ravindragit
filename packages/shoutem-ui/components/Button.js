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

const style = {
  'shoutem.ui.Text': {
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
    color: 'black',
    margin: 12,
  },

  'shoutem.ui.Icon': {
    fontSize: 24,
    marginHorizontal: 10,
  },

  '.clear': {
    'shoutem.ui.Icon': {
      color: 'white',
      marginHorizontal: 0,
    },

    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
    borderRadius: 0,
  },

  underlayColor: '#ccc',

  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  borderWidth: 1,
  borderColor: 'white',
};

const StyledButton = connectStyle('shoutem.ui.Button', style)(Button);
export {
  StyledButton as Button,
};
