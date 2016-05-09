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
      const { img } = style;
      const { marginLeft, marginRight } = img;
      const elementToWindowBorderDistance = marginLeft + marginRight;

      return [
        <ImagePreview
          style={style.img}
          source={{ uri: attachedImage.src }}
          windowWidth={imageWidth - elementToWindowBorderDistance}
          height={(attachedImage.height - elementToWindowBorderDistance) * imageScale}
          key={0}
        />,
      ];
    }

    if (node.attribs.type === 'video' && this.attachments.videos) {
      const attachedVideo = this.attachments.videos.find((video) => video.id === id);
      const videoWidth = (windowWidth < attachedVideo.width) ? windowWidth : attachedVideo.width;
      const videoScale = videoWidth / attachedVideo.width;
      const { video } = style;
      const { marginLeft, marginRight } = video;
      const elementToWindowBorderDistance = marginLeft + marginRight;

      return [
        <Video
          style={style.video}
          source={attachedVideo.src}
          windowWidth={videoWidth - elementToWindowBorderDistance}
          height={(attachedVideo.height - elementToWindowBorderDistance) * videoScale}
          key={0}
        />,
      ];
    }

    // TODO(Vladimir) - add gallery attachment type when merged to develop

    return null;
  }
}

