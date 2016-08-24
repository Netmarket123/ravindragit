/**
 * @flow
 */

import React from 'react';
import { Video } from '../../Video/Video';
import adjustElementSize from './AdjustElementSize';

type ReactComponentType = typeof React.Component;

import type {
  NodeType,
  AttribsType,
} from './types';

function VideoElement({
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
    <Video
      style={style}
      source={attributes.src}
      width={displayWidth}
      height={displayHeight}
    />);
}

const VideoTagTransformer = {
  canTransform(node: NodeType): boolean {
    return (node.name === 'video' && !!node.attribs && !!node.attribs.src);
  },

  transform(_: any, node: NodeType, style: any): Array<ReactComponentType> {
    const AdjustedVideoElement = adjustElementSize(VideoElement);

    return [
      <AdjustedVideoElement
        attributes={node.attribs}
        style={style.video}
        key={0}
      />,
    ];
  },
};

export default VideoTagTransformer;

