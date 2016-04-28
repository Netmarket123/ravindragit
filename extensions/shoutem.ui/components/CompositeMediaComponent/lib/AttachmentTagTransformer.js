import React from 'react-native';
import ImagePreview from '../../ImagePreview';
import Video from '../../Video/Video';

class AttachmentTagTransformer {
  canHandle(node) {
    return (node.name === 'attachment' && node.attribs);
  }

  constructor(attachments) {
    this.attachments = attachments;
  }

  handle(node, key) {
    const id = node.attribs.id;

    if (node.attribs.type === 'image') {
      // TODO(Vladimir) - ensure images exists
      const image = this.attachments.images.find((image) => image.id === id);

      return (
        <ImagePreview
          source={{ uri: image.src }}
          width={image.width}
          height={image.height}
          key={key}
        />
      );
    }

    if (node.attribs.type === 'video') {
      // TODO(Vladimir) - ensure images exists
      const video = this.attachments.videos.find((video) => video.id === id);

      return (
        <Video
          source={video.src}
          width={video.width}
          height={video.height}
          key={key}
        />
      );
    }
  }
}

export default AttachmentTagTransformer;

