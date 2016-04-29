import React, {
  Dimensions,
} from 'react-native';
import ImagePreview from '../../ImagePreview';
import Video from '../../Video/Video';

const {height, width} = Dimensions.get('window');

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

      const imageWidth = (width < image.width) ? width : image.width;
      const imageScale = imageWidth/image.width;

      return (
        <ImagePreview
          source={{ uri: image.src }}
          width={imageWidth - 30}
          height={image.height - 30}
          key={key}
        />
      );
    }

    if (node.attribs.type === 'video') {
      // TODO(Vladimir) - ensure images exists
      const video = this.attachments.videos.find((video) => video.id === id);
      const videoWidth = (width < video.width) ? width : video.width;
      const heightScale = videoWidth/video.width

      return (
        <Video
          source={video.src}
          width={videoWidth - 30}
          height={video.height * heightScale - 30}
          key={key}
        />
      );
    }
  }
}

export default AttachmentTagTransformer;

