/**
 * @flow
 */

import React from 'react';
import {
  Dimensions,
} from 'react-native';

import type {
  AttribsType,
} from './types';

export default function adjustElementSize(WrappedComponent: any): any {
  const windowWidth = Dimensions.get('window').width;

  return function ResizedComponent(props: {attributes: AttribsType, style: any}) {
    const {
      attributes,
      style,
    } = props;
    const attribsWidth = parseInt(attributes.width, 10);
    const attribsHeight = parseInt(attributes.height, 10);

    const imageWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const imageScale = imageWidth / attribsWidth;
    const { marginLeft, marginRight } = style;
    const elementToWindowBorderDistance = marginLeft + marginRight;
    const previewWidth = imageWidth - elementToWindowBorderDistance;
    const previewHeight = (attribsHeight - elementToWindowBorderDistance) * imageScale;

    return (
      <WrappedComponent
        {...props}
        displayWidth={previewWidth}
        displayHeight={previewHeight}
      />);
  };
}
