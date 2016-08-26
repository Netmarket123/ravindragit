import React from 'react';
import RNLinearGradient from 'react-native-linear-gradient';
import { connectStyle } from '@shoutem/theme';

function LinearGradient(props) {
  // The colors is not a valid RN style
  // property, so we have to unset it here.
  const style = {
    ...props.style,
  };
  delete style.colors;

  return (
    <RNLinearGradient
      {...props}
      style={style}
      colors={props.style.colors}
    >
      {props.children}
    </RNLinearGradient>
  );
}

LinearGradient.propTypes = {
  ...RNLinearGradient.propTypes,
  style: React.PropTypes.object,
  colors: React.PropTypes.array,
};

const defaultStyle = {
  colors: [],
};

const StyledLinearGradient = connectStyle('shoutem.ui.LinearGradient', defaultStyle)(LinearGradient);

export {
  StyledLinearGradient as LinearGradient,
};
