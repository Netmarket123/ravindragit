import React from 'react';
import { View } from './View';

import { connectStyle } from '@shoutem/theme';

function Overlay(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Overlay.propTypes = {
  ...View.propTypes,
};

const style = {
  '.solid-light': {
    'shoutem.ui.View': {
      'shoutem.ui.Heading': {
        color: 'black',
      },

      'shoutem.ui.Title': {
        color: 'black',
      },

      'shoutem.ui.Subtitle': {
        color: 'black',
      },

      'shoutem.ui.Text': {
        color: 'black',
      },

      'shoutem.ui.Caption': {
        color: 'black',
      },
    },

    backgroundColor: 'white',
  },

  'shoutem.ui.View': {
    'shoutem.ui.Heading': {
      color: 'white',
    },

    'shoutem.ui.Title': {
      color: 'white',
    },

    'shoutem.ui.Subtitle': {
      color: 'white',
    },

    'shoutem.ui.Text': {
      color: 'white',
    },

    'shoutem.ui.Caption': {
      color: 'white',
    },
  },

  '.dark': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 12,
  paddingVertical: 10,
  paddingHorizontal: 15,
  backgroundColor: 'rgba(85, 85, 85, 0.5)',
};

const StyledTag = connectStyle('shoutem.ui.Overlay', style)(Overlay);

export {
  StyledTag as Overlay,
};
