import React from 'react';

import {
  ImagePreview,
} from '@shoutem/ui';

import type {
  NodeType,
} from './types';

import { logLifecycle } from '@shoutem/profiler';

import adjustElementSize from './AdjustElementSize';

// TODO(Vladimir) - unify with video
function InlineImagePreviewAttachment({
  style,
  attributes,
  displayWidth,
  displayHeight,
}) {
  const ProfiledImagePreview = logLifecycle('RM Inline SE-ATTACH Image')(ImagePreview);

  return (
    <ProfiledImagePreview
      style={style}
      source={attributes.src}
      width={displayWidth}
      height={displayHeight}
    />);
}

export default {
  canTransform(node: NodeType): boolean {
    return (node.name === 'se-attachment' && !!node.attribs
            && node.attribs.type === 'image' && node.attribs.src);
  },

  transform(_: any, node: NodeType, style: any) : any {
    const AdjustedImagePreviewAttachment = adjustElementSize(InlineImagePreviewAttachment);

    return [
      <AdjustedImagePreviewAttachment
        attributes={node.attribs}
        style={style.image}
        key={0}
      />,
    ];
  },
};
