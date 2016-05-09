/**
 * @flow
 */

import React, {
  Dimensions,
} from 'react-native';

import ImagePreview from '../../ImagePreview';
import Video from '../../Video/Video';

import type {
  AttachmentsType,
  NodeType,
} from './types';

const windowWidth = Dimensions.get('window').width;

// TODO(Vladimir) - split into multiple files, each implementing the TagTransformer interface
export default class AttachmentTagTransformer {
  attachments: AttachmentsType;

  constructor(attachments: AttachmentsType) {
    this.attachments = attachments;
  }

  canTransform(node: NodeType): boolean {
    return (node.name === 'attachment' && !!node.attribs);
  }

  transform(_: any, node: NodeType, style: any) : any {
    const id = node.attribs.id;

    if (node.attribs.type === 'image' && this.attachments.images) {
      const attachedImage = this.attachments.images.find((image) => image.id === id);

      const imageWidth = (windowWidth < attachedImage.width) ? windowWidth : attachedImage.width;
      const imageScale = imageWidth / attachedImage.width;
      const imageMargin = style.img.marginHorizontal;

      return [
        <ImagePreview
          style={style.img}
          source={{ uri: attachedImage.src }}
          windowWidth={imageWidth - imageMargin}
          height={(attachedImage.height - imageMargin) * imageScale}
          key={0}
        />,
      ];
    }

    if (node.attribs.type === 'video' && this.attachments.videos) {
      const attachedVideo = this.attachments.videos.find((video) => video.id === id);
      const videoWidth = (windowWidth < attachedVideo.width) ? windowWidth : attachedVideo.width;
      const heightScale = videoWidth / attachedVideo.width;
      const videoMargin = style.video.marginHorizontal;

      return [
        <Video
          style={style.video}
          source={attachedVideo.src}
          windowWidth={videoWidth - videoMargin}
          height={(attachedVideo.height - videoMargin) * heightScale}
          key={0}
        />,
      ];
    }

    // TODO(Vladimir) - add gallery attachment type when merged to develop

    return null;
  }
}

