import React from 'react';
import {
  Image as RNImage,
  Platform,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Image(props) {
  let resolvedProps = props;
  const { source, defaultSource } = props;

  // defaultSource is not supported on Android, so we manually
  // reassign the defaultSource prop to source if source is not defined
  if ((Platform.OS === 'android') && (!source || !source.uri)) {
    resolvedProps = {
      ...props,
      // Image views are not rendered on Android if there is no image to display,
      // so we fallback to a transparent image to be compatible with iOS
      source: defaultSource || require('../assets/images/transparent.png'),
    };
  }

  return (
    <RNImage {...resolvedProps}>
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
