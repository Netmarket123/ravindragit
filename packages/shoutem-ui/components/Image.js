import React from 'react';
import {
  Image as RNImage,
  Dimensions,
  Animated as RNAnimated,
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

function AnimatedImage(props) {
  return (
    <RNAnimated.Image {...props}>
      {props.children}
    </RNAnimated.Image>
  );
}

AnimatedImage.propTypes = {
  ...RNImage.propTypes,
};

const Animated = {
  Image: connectStyle('shoutem.ui.Animated.Image', {})(AnimatedImage),
};

const StyledImage = connectStyle('shoutem.ui.Image', {})(Image);
export {
  StyledImage as Image,
  Animated,
};
