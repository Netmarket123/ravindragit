import React from 'react-native';

import ImagePreview from '../../ImagePreview';

const ImageTagTransformer = {
  canHandle(node) {
    return (node.name === 'img' && node.attribs && node.attribs.src);
  },

  handle(node, key) {
    // TODO(Vladimir) - check if int
    const width = Number(node.attribs.width)
    const height = Number(node.attribs.height)

    return (
      <ImagePreview
        source={{ uri: node.attribs.src }}
        width={width}
        height={height}
        key={key}
      />
    );
  },
};

export default ImageTagTransformer;

