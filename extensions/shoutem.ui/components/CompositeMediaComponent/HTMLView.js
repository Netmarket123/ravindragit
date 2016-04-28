import React, {
  StyleSheet,
  Component,
  Text,
  PropTypes,
  View,
} from 'react-native';
import HtmlRenderer from './htmlToElement';

import ImageTagTransformer from './lib/ImageTagTransformer';
import AttachmentTagTransformer from './lib/AttachmentTagTransformer';

const propTypes = {
  body: PropTypes.string,
  stylesheet: PropTypes.object,
  onError: PropTypes.func,
  renderNode: PropTypes.func,
};

export default class CompositeMedia extends Component {
  state = {
    element: null,
  }

  componentDidMount() {
    this.mounted = true;
    const {body, attachments} = this.props;
    this.startHtmlRender(body, attachments);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.body !== nextProps.body) {
      this.startHtmlRender(nextProps.body, nextProps.attachments);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startHtmlRender(body, attachments) {
    if (!body) {
      return this.setState({ element: null });
    }

    const opts = {
      styles: Object.assign({}, styles, this.props.stylesheet),
      customRenderer: this.props.renderNode,
    };

    const htmlRenderer = new HtmlRenderer([
      new AttachmentTagTransformer(attachments),
      ImageTagTransformer,
    ]);

    htmlRenderer.htmlToElement(body, opts, (err, element) => {
      if (err) {
        this.props.onError(err);
      }

      if (this.mounted) {
        this.setState({ element });
      }
    });
  }

  render() {
    if (this.state.element) {
      return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}} >
          {this.state.element}
        </View>
      );
    }
    return <View style={{flexDirection: 'column'}} />;
  }
}

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

CompositeMedia.propTypes = propTypes;
CompositeMedia.defaultProps = {
  onError: console.error.bind(console),
};
