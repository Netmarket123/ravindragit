import React from 'react';
import RNLinearGradient from 'react-native-linear-gradient';
import { connectStyle } from '@shoutem/theme';

function LinearGradient(props) {
  return (
    <RNLinearGradient {...props}>
      {props.children}
    </RNLinearGradient>
  );
}

LinearGradient.propTypes = {
  ...RNLinearGradient.propTypes,
};

const StyledLinearGradient = connectStyle('shoutem.ui.LinearGradient', {})(LinearGradient);

export {
  StyledLinearGradient as LinearGradient,
};
