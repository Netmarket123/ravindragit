import React from 'react';

import {
  ImageGallery,
} from '@shoutem/ui';

import type {
  NodeType,
} from './types';

import { logLifecycle } from '@shoutem/profiler';

import adjustElementSize from './AdjustElementSize';

function InlineGalleryAttachment({
  style,
  sources,
  displayWidth,
  displayHeight,
}) {
  const ProfiledImageGallery = logLifecycle('RM Inline SE-ATTACH Video')(ImageGallery);

  return (
    <ProfiledImageGallery
      style={style.video}
      sources={sources}
      width={displayWidth}
      height={displayHeight}
    />);
}

export default {
  canTransform(node: NodeType): boolean {
    return (node.name === 'se-attachment' && !!node.attribs
            && node.attribs.type === 'gallery');
  },

  transform(_: any, node: NodeType, style: any) : any {
    const AdjustedInlineGalleryAttachment = adjustElementSize(InlineGalleryAttachment);
    const imageSources = node.children
              .filter(child => child.name === 'se-attachment' && child.attribs.type === 'image')
              .map(child => child.attribs.src)
              .filter(imageUrl => imageUrl);

    return [
      <AdjustedInlineGalleryAttachment
        sources={imageSources}
        attributes={node.attribs}
        style={style.gallery}
        key={0}
      />,
    ];
  },
};
