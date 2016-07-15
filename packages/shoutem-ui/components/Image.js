import React from 'react';
import {
  Image as RNImage,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Image(props) {
  return (
    <RNImage {...props}>
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
