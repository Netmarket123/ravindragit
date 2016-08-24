/**
 * @flow
 */

import React from 'react';
import { ImagePreview } from '../../ImagePreview';
import adjustElementSize from './AdjustElementSize';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
  AttribsType,
} from './types';

function ImagePreviewElement({
  style,
  attributes,
  displayWidth,
  displayHeight,
} : {
  style: any,
  attributes: AttribsType,
  displayWidth: number,
  displayHeight: number
}) {
  return (
    <ImagePreview
      style={style}
      source={{
        uri: attributes.src,
        // Image is not rendered correctly,
        // if we use the original image sizes here
        width: displayWidth,
        height: displayHeight,
      }}
      width={displayWidth}
      height={displayHeight}
      key={0}
    />);
}

const ImageTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'img' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType, style: any): Array<ReactComponentType> {
    const AdjustedImagePreviewElement = adjustElementSize(ImagePreviewElement);

    return [
      <AdjustedImagePreviewElement
        attributes={node.attribs}
        style={style.img}
        key={0}
      />,
    ];
  },
};

export default ImageTagTransformer;

