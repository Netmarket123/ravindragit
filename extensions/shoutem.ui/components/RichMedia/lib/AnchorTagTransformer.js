import React, {
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

import type {
  NodeType,
} from './types';

function allChildrenAreTextNodes(node) {
  return node.children.every(child => child.type === 'text');
}

function followLink(node) {
  if (node.attribs && node.attribs.href) {
    const url = node.attribs.href;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
}

const AnchorTagTransformer = {
  canTransform(node: NodeType): boolean {
    return node.name === 'a';
  },

  transform(renderChildren: any, node: NodeType) {
    const ContainerComponent = allChildrenAreTextNodes(node) ? Text : TouchableOpacity;
    const openURL = followLink.bind(null, node);
    return (
      <ContainerComponent
        onPress={openURL}
      >
        {renderChildren()}
      </ContainerComponent>
    );
  },
};

export default AnchorTagTransformer;
