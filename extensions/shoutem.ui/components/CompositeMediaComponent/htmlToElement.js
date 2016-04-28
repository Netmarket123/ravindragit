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
    height: null,
    flexWrap: 'wrap',
  },
};

function decodeHTML(string) {
  return entities.decodeHTML(string);
}

function containsAttachment(node) {
  return node.name === 'attachment'
    || (node.children && node.children.some((childNode) => containsAttachment(childNode)));
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

      const nodesList = dom.map((node, index, list) => {
        if (node.type === 'text') {
          const parentStyle = parent ? opts.styles[parent.name] : null;
          return (
            <Text key={index} style={[parentStyle, styles.text]}>
              {decodeHTML(node.data)}
            </Text>
          );
        }

        const ContainerElement = containsAttachment(node) ? View : Text;

        if (node.type === 'tag') {
          const mediaTag = renderTag(node, index);

          if (node.name === 'pre') {
            return (
              <ContainerElement key={index} >
                <Text>{LINE_BREAK}</Text>
                {domToElement(node.children, node)}
              </ContainerElement>
            );
          } else if (node.name === 'a') {
            return domToElement(node.children, node);
          } else if (node.name === 'li') {
            return (
              <ContainerElement key={index} >
                <Text>{BULLET}</Text>
                {domToElement(node.children, node)}
              </ContainerElement>
            );
          } else if (node.name === 'br') {
            return (
              <ContainerElement key={index} style={{ width: 330, flexDirection: 'row', flexWrap: 'wrap' }} >
                {domToElement(node.children, node)}
                <Text>{LINE_BREAK}</Text>
              </ContainerElement>
            );
          } else if (node.name === 'p') {
            let paragraphBreak = null;

            if (index < list.length - 1) {
              paragraphBreak = <Text>{PARAGRAPH_BREAK}</Text>;
            }

            return (
              <ContainerElement key={index} style={{ width: 330, flexDirection: 'row', flexWrap: 'wrap' }} >
                {domToElement(node.children, node)}
                {paragraphBreak}
              </ContainerElement>
            );
          } else if (node.name === 'h1' || node.name === 'h2' || node.name === 'h3' || node.name === 'h4' || node.name === 'h5') {
            return (
              <ContainerElement key={index} >
                {domToElement(node.children, node)}
                <Text>{PARAGRAPH_BREAK}</Text>
              </ContainerElement>
            );
          } else if (node.name === 'attachment') {
            return (
              <View key={index} >
                {mediaTag}
              </View>
            );
          }
        }
        return null;
      });

      return nodesList;
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
