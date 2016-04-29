import React, {
  Dimensions,
} from 'react-native';

import ImagePreview from '../../ImagePreview';

const {height, width} = Dimensions.get('window');
const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;
const ImageTagTransformer = {
  canHandle(node) {
    return (node.name === 'img' && node.attribs && node.attribs.src);
  },

  handle(node, key) {
    // TODO(Vladimir) - check if int
    const imageWidth = (width < node.attribs.width) ? width : node.attribs.width;
    const imageScale = imageWidth/node.attribs.width;

    return (
      <ImagePreview
        source={{ uri: node.attribs.src }}
        width={imageWidth - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE}
        height={(node.attribs.height - MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE) * imageScale}
        key={key}
      />
    );
  },
};

export default ImageTagTransformer;

