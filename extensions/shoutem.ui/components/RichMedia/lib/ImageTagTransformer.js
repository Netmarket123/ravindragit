/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';

import ImagePreview from '../../ImagePreview/ImagePreview';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
} from './types';

const windowWidth = Dimensions.get('window').width;
const ImageTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'img' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType, style: any): Array<ReactComponentType> {
    const attribsWidth = parseInt(node.attribs.width, 10);
    const attribsHeight = parseInt(node.attribs.height, 10);
    const imageWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const imageScale = imageWidth / attribsWidth;
    const { img } = style;
    const { marginLeft, marginRight } = img;
    const elementToWindowBorderDistance = marginLeft + marginRight;

    return [
      <ImagePreview
        style={style.img}
        source={{ uri: node.attribs.src }}
        width={imageWidth - elementToWindowBorderDistance}
        height={(attribsHeight - elementToWindowBorderDistance) * imageScale}
        key={0}
      />,
    ];
  },
};

export default ImageTagTransformer;

