import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';
import HypermediaComposer from './lib/HypermediaComposer';
import AttachmentTagTransformer from './lib/AttachmentTagTransformer';

const propTypes = {
  body: PropTypes.string,
  stylesheet: PropTypes.object,
  onError: PropTypes.func,
  attachments: PropTypes.object,
};

/**
 * Displays content in the html body as a composition of
 * react native components.
 */
export default class CompositeMedia extends Component {
  state = {
    element: null,
  }

  componentDidMount() {
    this.mounted = true;
    const { body, attachments } = this.props;
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
    if (body) {
      const attachmentTagTransformer = new AttachmentTagTransformer(attachments);
      const hypermediaComposer = new HypermediaComposer([attachmentTagTransformer]);

      hypermediaComposer.compose(body, (err, element) => {
        if (err) {
          this.props.onError(err);
        }

        if (this.mounted) {
          this.setState({ element });
        }
      });
    } else {
      this.setState({ element: null });
    }
  }

  render() {
    return (
      <View>
        {this.state.element}
      </View>
    );
  }
}

CompositeMedia.propTypes = propTypes;
CompositeMedia.defaultProps = {
  onError: console.error.bind(console),
};
