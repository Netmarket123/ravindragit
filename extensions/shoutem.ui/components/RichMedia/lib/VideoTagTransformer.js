/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';

import Video from '../../Video/Video';

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

const VideoTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'video' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType): Array<ReactComponentType> {
    const attribsWidth = parseInt(node.attribs.width, 10);
    const attribsHeight = parseInt(node.attribs.height, 10);
    const videoWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const videoScale = videoWidth / attribsWidth;
    const mediaElementToWindowBorderDistance = style.image.marginLeft + style.image.marginRight;

    return [
      <Video
        source={node.attribs.src}
        width={videoWidth - mediaElementToWindowBorderDistance}
        height={(attribsHeight - mediaElementToWindowBorderDistance) * videoScale}
        key={0}
      />,
    ];
  },
};

export default connectStyle('shoutem.ui.VideoTagTransformer', style)(VideoTagTransformer);
