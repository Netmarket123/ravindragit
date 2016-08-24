import React from 'react';
import {
  Dimensions,
} from 'react-native';

export default function adjustElementSize(WrappedComponent) {
  const windowWidth = Dimensions.get('window').width;
  const FALLBACK_ATTACHMENT_HEIGHT = 250;

  return function (props) {
    const {
      attributes,
      style,
    } = props;

    let elementWidth = windowWidth;
    let elementScale = 1;

    if (!!attributes.width && windowWidth < attributes.width) {
      elementWidth = attributes.width;
      elementScale = elementWidth / attributes.width;
    }

    const elementHeight = attributes.height || FALLBACK_ATTACHMENT_HEIGHT;

    const { marginLeft, marginRight } = style;
    const elementToWindowBorderDistance = marginLeft + marginRight || 0;

    const displayWidth = elementWidth - elementToWindowBorderDistance;
    const displayHeight = (elementHeight - elementToWindowBorderDistance) * elementScale;

    return (
      <WrappedComponent
        {...props}
        displayWidth={displayWidth}
        displayHeight={displayHeight}
      />);
  };
}
