const htmlparser = require('./htmlparser');
const entities = require('./entities');

import React, {
  Text,
  View,
} from 'react-native';

const LINE_BREAK = '\n';
const PARAGRAPH_BREAK = '\n\n';
const BULLET = '\u2022 ';

const styles = {
  text: {
    flex: 0,
    width: null,
  }
}

function decodeHTML(string) {
  return entities.decodeHTML(string);
}

export default class HtmlRenderer {
  constructor(tagTransformers) {
    this.tagTransformers = tagTransformers;
    this.renderTag = this.renderTag.bind(this);
  }

  renderTag(node, index) {
    const transformerForTag = this.tagTransformers.find(transformer => transformer.canHandle(node));

    if (transformerForTag) {
      return transformerForTag.handle(node, index);
    }

    return null;
  }

  htmlToElement(rawHtml, opts, done) {
    const renderTag = this.renderTag;
    function domToElement(dom, parent) {
      if (!dom) return null;

      return dom.map((node, index, list) => {
        if (node.type === 'text') {
          return (
            <Text key={index} style={parent ? opts.styles[parent.name] : null}>
              {decodeHTML(node.data)}
            </Text>
          );
        }

        if (node.type === 'tag') {
          const mediaTag = renderTag(node, index);

          const pre = node.name === 'pre' ? <Text>{LINE_BREAK}</Text> : null;
          const li = node.name === 'li' ? <Text>{BULLET}</Text> : null;
          const br = node.name === 'br' ? <Text>{LINE_BREAK}</Text> : null;
          const p = (node.name === 'p' && index < list.length - 1)
                    ? <Text>{PARAGRAPH_BREAK}</Text>
                    : null;
          const h1 = (node.name === 'h1' || node.name === 'h2' || node.name === 'h3' || node.name === 'h4' || node.name === 'h5')
                    ? <Text>{PARAGRAPH_BREAK}</Text>
                    : null;

          return (
            <View key={index} >
            {pre}
            {li}
            {domToElement(node.children, node)}
            {br}
            {p}
            {h1}
            {mediaTag}
            </View>
          );
        }
        return null;
      });
    }

    const handler = new htmlparser.DomHandler((err, dom) => {
      if (err) {
        done(err);
      }

      done(null, domToElement(dom));
    });
    const parser = new htmlparser.Parser(handler);
    parser.write(rawHtml);
    parser.done();
  }
}
