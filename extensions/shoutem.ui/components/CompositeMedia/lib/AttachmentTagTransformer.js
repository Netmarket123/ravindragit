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
const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;

// TODO(Vladimir) - split into multiple files, each implementing the TagTransformer interface
export default class AttachmentTagTransformer {
  attachments: AttachmentsType;

  constructor(attachments: AttachmentsType) {
    this.attachments = attachments;
  }

  canTransform(node: NodeType): boolean {
    return (node.name === 'attachment' && !!node.attribs);
  }

  transform(_: any, node: NodeType) : any {
    const id = node.attribs.id;

    if (node.attribs.type === 'image' && this.attachments.images) {
      const attachedImage = this.attachments.images.find((image) => image.id === id);

      const imageWidth = (windowWidth < attachedImage.width) ? windowWidth : attachedImage.width;
      const imageScale = imageWidth / attachedImage.width;

      return [
        <ImagePreview
          source={{ uri: attachedImage.src }}
          windowWidth={imageWidth - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE}
          height={(attachedImage.height - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE) * imageScale}
          key={0}
        />,
      ];
    }

    if (node.attribs.type === 'video' && this.attachments.videos) {
      const attachedVideo = this.attachments.videos.find((video) => video.id === id);
      const videoWidth = (windowWidth < attachedVideo.width) ? windowWidth : attachedVideo.width;
      const heightScale = videoWidth / attachedVideo.width;

      return [
        <Video
          source={attachedVideo.src}
          windowWidth={videoWidth - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE}
          height={attachedVideo.height * heightScale - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE}
          key={0}
        />,
      ];
    }

    // TODO(Vladimir) - add gallery attachment type when merged to develop

    return null;
  }
}

