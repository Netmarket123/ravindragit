/**
 * @flow
 */

import React from 'react';

import {
  Video,
} from '@shoutem/ui';

import type {
  NodeType,
  AttribsType,
} from './types';

import { logLifecycle } from '@shoutem/profiler';

import adjustElementSize from './AdjustElementSize';

// TODO(Vladimir) - unify with ImagePreview
function InlineVideoAttachment({
  attributes,
  style,
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

export default {
  canTransform(node: NodeType): boolean {
    return (node.name === 'se-attachment' && !!node.attribs
            && node.attribs.type === 'video' && !!node.attribs.src);
  },

  transform(_: any, node: NodeType, style: any) : any {
    const AdjustedInlineVideoAttachment = adjustElementSize(InlineVideoAttachment);

    return [
      <AdjustedInlineVideoAttachment
        attributes={node.attribs}
        style={style.video}
        key={0}
      />,
    ];
  },
};
