/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';

import ImagePreview from '../../ImagePreview';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
} from './types';

const windowWidth = Dimensions.get('window').width;
const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;
const ImageTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'img' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType): Array<ReactComponentType> {
    const attribsWidth = parseInt(node.attribs.width, 10);
    const attribsHeight = parseInt(node.attribs.height, 10);
    const imageWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const imageScale = imageWidth / attribsWidth;

    return [
      <ImagePreview
        source={{ uri: node.attribs.src }}
        width={imageWidth - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE}
        height={(attribsHeight - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE) * imageScale}
        key={0}
      />,
    ];
  },
};

export default ImageTagTransformer;

