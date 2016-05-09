import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';
import HypermediaComposer from './lib/HypermediaComposer';
import AttachmentTagTransformer from './lib/AttachmentTagTransformer';

const propTypes = {
  body: PropTypes.string,
  onError: PropTypes.func,
  attachments: PropTypes.object,
};

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };

const style = {
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
  video: {
  },
  img: {
  },
};

const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;

function getMediaElementMargin(mediaElementStyle) {
  const { marginHorizontal, margin, marginLeft, marginRight } = mediaElementStyle;

  return marginHorizontal ||
         margin ||
         marginLeft + marginRight ||
         MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE;
}

function getStyleWithUpdatedMediaElementMargins(oldStyle) {
  const videoStyle = oldStyle.video;
  const videoFullWidth = getMediaElementMargin(videoStyle);

  const imageStyle = oldStyle.img;
  const imageFullWidth = getMediaElementMargin(imageStyle);

  return Object.assign({}, oldStyle, {
    img: {
      marginHorizontal: imageFullWidth,
    },
    video: {
      marginHorizontal: videoFullWidth,
    },
  });
}

/**
 * Displays content in the html body as a composition of
 * react native components.
 */
class RichMedia extends Component {
  state = {
    content: null,
  }

  componentDidMount() {
    const { body, attachments } = this.props;
    this.startHtmlRender(body, attachments);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.body !== nextProps.body) {
      this.startHtmlRender(nextProps.body, nextProps.attachments);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.body !== nextProps.body || this.state.content !== nextState.content;
  }

  startHtmlRender(body, attachments) {
    if (body) {
      const customStyle = getStyleWithUpdatedMediaElementMargins(style);
      const attachmentTagTransformer = new AttachmentTagTransformer(attachments);
      const hypermediaComposer = new HypermediaComposer([attachmentTagTransformer], customStyle);

      hypermediaComposer.compose(body, (err, content) => {
        if (err) {
          this.props.onError(err);
        }

        this.setState({ content });
      });
    } else {
      this.setState({ content: null });
    }
  }

  render() {
    return (
      <View>
        {this.state.content}
      </View>
    );
  }
}

RichMedia.propTypes = propTypes;
RichMedia.defaultProps = {
  onError: console.error.bind(console),
};

export default connectStyle('shoutem.ui.RichMedia', style)(RichMedia);
