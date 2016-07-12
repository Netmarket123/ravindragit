import React, {
  Component,
  PropTypes,
} from 'react';
import { View } from '../View';
import * as _ from 'lodash';

import { connectStyle, INCLUDE } from '@shoutem/theme';
import HypermediaComposer from './lib/HypermediaComposer';
import AttachmentTagTransformer from './lib/AttachmentTagTransformer';

const propTypes = {
  body: PropTypes.string,
  onError: PropTypes.func,
  attachments: PropTypes.object,
  style: PropTypes.object,
};

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };

const MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE = 30;

const style = {
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    fontWeight: '500',
    color: '#000',
  },
  h1: {
    color: '#000',
    fontSize: 28,
  },
  h2: {
    color: '#000',
    fontSize: 24,
  },
  h3: {
    fontWeight: '900',
    color: '#000',
    fontSize: 18,
  },
  h4: {
    fontWeight: '700',
    color: '#000',
    fontSize: 16,
  },
  h5: {
    fontWeight: '500',
    color: '#000',
    fontSize: 14,
  },
  video: {
    marginHorizontal: MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE,
    container: {
      marginTop: 8,
      marginBottom: 15,
    },
  },
  img: {
    marginHorizontal: MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE,
    container: {
      marginTop: 8,
      marginBottom: 15,
    },
  },
  gallery: {
    marginHorizontal: MEDIA_ELEMENT_TO_WINDOW_BORDER_DISTANCE,
    container: {
      marginTop: 8,
      marginBottom: 15,
    },
  },
  p: {
  },
};

function getMediaElementMargin(mediaElementStyle) {
  const { marginHorizontal, margin, marginLeft, marginRight } = mediaElementStyle;

  const left = marginLeft || marginHorizontal / 2 || margin;
  const right = marginRight || marginHorizontal / 2 || margin;

  return {
    marginLeft: left,
    marginRight: right,
  };
}

function getStyleWithUpdatedMediaElementMargins(oldStyle) {
  const videoStyle = oldStyle.video;
  const videoWithMargins = getMediaElementMargin(videoStyle);

  const imageStyle = oldStyle.img;
  const imageWithMargins = getMediaElementMargin(imageStyle);

  const galleryStyle = oldStyle.gallery;
  const galleryWithMargins = getMediaElementMargin(galleryStyle);

  return _.merge({}, oldStyle, {
    img: imageWithMargins,
    video: videoWithMargins,
    gallery: galleryWithMargins,
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
      const customStyle = getStyleWithUpdatedMediaElementMargins(this.props.style);
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

const StyledRichMedia = connectStyle('shoutem.ui.RichMedia', style)(RichMedia);
export {
  StyledRichMedia as RichMedia,
};
