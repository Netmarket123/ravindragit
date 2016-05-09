/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';

import ImagePreview from '../../ImagePreview';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
} from './types';

const windowWidth = Dimensions.get('window').width;
const style = {
  image: {
    marginLeft: 15,
    marginRight: 15,
  },
};

const ImageTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'img' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType): Array<ReactComponentType> {
    const attribsWidth = parseInt(node.attribs.width, 10);
    const attribsHeight = parseInt(node.attribs.height, 10);
    const imageWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const imageScale = imageWidth / attribsWidth;
    const mediaElementToWindowBorderDistance = style.image.marginLeft + style.image.marginRight;

    return [
      <ImagePreview
        source={{ uri: node.attribs.src }}
        width={imageWidth - mediaElementToWindowBorderDistance}
        height={(attribsHeight - mediaElementToWindowBorderDistance) * imageScale}
        key={0}
      />,
    ];
  },
};

export default connectStyle('shoutem.ui.ImageTagTransformer', style)(ImageTagTransformer);

