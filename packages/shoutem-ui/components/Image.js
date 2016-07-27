import React from 'react';
import {
  Image as RNImage,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Image(props) {
  // resizeMode is not a RN style but a prop.
  const style = {
    ...props.style,
  };
  delete style.resizeMode;

  return (
    <RNImage
      {...props}
      style={style}
      resizeMode={props.style.resizeMode}
    >
      {props.children}
    </RNImage>
  );
}

Image.propTypes = {
  ...RNImage.propTypes,
};

const StyledImage = connectStyle('shoutem.ui.Image', {})(Image);
export {
  StyledImage as Image,
};
