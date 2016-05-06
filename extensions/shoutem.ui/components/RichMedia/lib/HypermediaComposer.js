/**
 * @flow
 */

const htmlparser = require('./vendor/htmlparser');
const entities = require('./vendor/entities');

import React, {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import ImageTagTransformer from './ImageTagTransformer';
import VideoTagTransformer from './VideoTagTransformer';
import HtmlTagTransformer from './HtmlTagTransformer';
type TagTransformerType = typeof HtmlTagTransformer;

import type {
  NodeType,
} from './types';

const TEXT_NODE = 'text';
const ELEMENT_NODE = 'tag';

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };

const styles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    fontWeight: '500',
    color: '#007AFF',
  },
});

const defaultMediaTagTransformers = [
  ImageTagTransformer,
  VideoTagTransformer,
];

function decodeHTML(string) {
  return entities.decodeHTML(string);
}

/**
 * Composes react components by using TagTransformers.
 * It uses TagTransformers for HTML tags but can also
 * use other tags if their tag transformers are provided
 * as the constructor arguments.
 */
export default class HypermediaComposer {

  /**
   * Transformers used for transforming default html media tags and any additional
   * transformers provided in the constructor
   */
  mediaTransformers: Array<TagTransformerType>;
  // All tag transformers
  tagTransformers: Array<TagTransformerType>;
  renderElementNode: any;

  constructor(mediaTransformers?: Array<TagTransformerType>) {
    const additionalMediaTransformers = mediaTransformers || [];

    this.mediaTransformers = defaultMediaTagTransformers.concat(additionalMediaTransformers);
    this.tagTransformers = this.mediaTransformers.concat(HtmlTagTransformer);
    this.renderElementNode = this.renderElementNode.bind(this);
  }

  isMediaElement(node: NodeType): boolean {
    return this.mediaTransformers.some(transformer => transformer.canTransform(node));
  }

  containsMediaElement(node: NodeType): boolean {
    return this.isMediaElement(node)
    || (!!node.children && node.children.some((childNode) => this.containsMediaElement(childNode)));
  }

  /**
   * Return an array of react components representing the provided
   * array of dom nodes.
   */
  domToElement(dom?: Array<NodeType>, parent?: NodeType): any {
    if (!dom) return null;

    return dom.map((node, index) => {
      if (node.type === TEXT_NODE) {
        const parentStyle = parent ? styles[parent.name] : null;
        return (
          <Text key={index} style={parentStyle}>
            {decodeHTML(node.data)}
          </Text>
        );
      }

      if (node.type === ELEMENT_NODE) {
        return this.renderElementNode(node, index);
      }

      return null;
    });
  }

  renderElementNode(node: NodeType, index: number) {
    const transformerForTag = this.tagTransformers
                                  .find(transformer => transformer.canTransform(node));

    if (transformerForTag) {
      const ContainerElement = this.containsMediaElement(node) ? View : Text;
      const renderChildren = this.domToElement.bind(this, node.children, node);

      return (
        <ContainerElement key={index} >
          {transformerForTag.transform(renderChildren, node)}
        </ContainerElement>
      );
    }

    return this.domToElement(node.children, node);
  }

  /**
   * Compose the content from the raw html string into a react component and
   * return it in a done callback
   */
  compose(rawHtml: string, done: any) {
    const handler = new htmlparser.DomHandler((err, dom) => {
      if (err) {
        done(err);
      }

      done(null, this.domToElement(dom));
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(rawHtml);
    parser.done();
  }
}
