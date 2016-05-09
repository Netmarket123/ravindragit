/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';

import Video from '../../Video/Video';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
} from './types';

const windowWidth = Dimensions.get('window').width;
const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;
const VideoTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'video' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType, style): Array<ReactComponentType> {
    const attribsWidth = parseInt(node.attribs.width, 10);
    const attribsHeight = parseInt(node.attribs.height, 10);
    const videoWidth = (windowWidth < attribsWidth) ? windowWidth : attribsWidth;
    const videoScale = videoWidth / attribsWidth;
    const { video } = style;
    const { marginLeft, marginRight } = img;

    let elementToWindowBorderDistance = MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE;

    if (marginLeft && marginRight) {
      elementToWindowBorderDistance = marginLeft + marginRight;
    }

    return [
      <Video
        style={style}
        source={node.attribs.src}
        width={videoWidth - elementToWindowBorderDistance}
        height={(attribsHeight - elementToWindowBorderDistance) * videoScale}
        key={0}
      />,
    ];
  },
};

export default VideoTagTransformer;

