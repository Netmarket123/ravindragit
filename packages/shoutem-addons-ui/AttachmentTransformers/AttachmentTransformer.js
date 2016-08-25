/**
 * @flow
 */
import type {
  NodeType,
} from './types';

import inlineVideoAttachmentTransformer from './InlineVideoAttachmentTransformer';
import inlineGalleryAttachmentTransformer from './InlineGalleryAttachmentTransformer';
import inlineImagePreviewAttachmentTransformer from './InlineImagePreviewAttachmentTransformer';

export default {
  canTransform(node: NodeType): boolean {
    return (node.name === 'se-attachment' && !!node.attribs);
  },

  transform(_: any, node: NodeType, style: any) : any {
    if (inlineVideoAttachmentTransformer.canTransform(node)) {
      return inlineVideoAttachmentTransformer.transform(undefined, node, style);
    }

    if (inlineGalleryAttachmentTransformer.canTransform(node)) {
      return inlineGalleryAttachmentTransformer.transform(undefined, node, style);
    }

    if (inlineImagePreviewAttachmentTransformer.canTransform(node)) {
      return inlineImagePreviewAttachmentTransformer.transform(undefined, node, style);
    }

    return null;
  },
};

