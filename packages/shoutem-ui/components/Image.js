import React from 'react';
import {
  Image as RNImage,
  Dimensions,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Image(props) {
  return (
    <RNImage {...props}>
      {props.children}
    </RNImage>
  );
}

Image.propTypes = {
  ...RNImage.propTypes,
};

const window = Dimensions.get('window');

const childrenStyle = {
  'shoutem.ui.Heading': {
    color: 'white',
    marginVertical: 8,
  },

  'shoutem.ui.Title': {
    color: 'white',
    marginVertical: 12,
  },

  'shoutem.ui.Subtitle': {
    color: 'white',
  },

  'shoutem.ui.Caption': {
    color: 'white',
  },

  'shoutem.ui.Text': {
    color: 'white',
  },

  'shoutem.ui.View': {
    '.actions': {
      'shoutem.ui.Icon': {
        color: 'white',
      },

      '*': {
        marginRight: 0,
        marginVertical: 0,
        marginLeft: 10,
      },

      flex: 0,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  },
};

const style = {
  ...childrenStyle,

  'shoutem.ui.Overlay': {
    'shoutem.ui.View': {
      ...childrenStyle,
    },

    alignSelf: 'stretch',
    marginVertical: -33,
    marginHorizontal: -33,
    paddingVertical: 33,
    paddingHorizontal: 33,
  },

  '.small-avatar': {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    resizeMode: 'cover',
  },

  '.small': {
    width: 65,
    height: 65,
  },

  '.medium': {
    width: 145,
    height: 92,
  },

  '.medium-square': {
    width: 145,
    height: 145,
  },

  '.large': {
    width: 375,
    height: 240,
  },

  '.large-portrait': {
    width: 375,
    height: 375,
  },

  '.large-square': {
    flex: 1,
    height: (330 / 375) * window.width,
  },

  '.large-wide': {
    width: 375,
    height: 200,
  },

  '.rounded-corners': {
    borderRadius: 2,
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0)',
  },

  '.top-aligned': {
    justifyContent: 'flex-start',
  },

  '.bottom-aligned': {
    justifyContent: 'flex-end',
  },

  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  resizeMode: 'cover',
};

const StyledImage = connectStyle('shoutem.ui.Image', style)(Image);
export {
  StyledImage as Image,
};
