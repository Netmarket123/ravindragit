import React from 'react';
import { Text as RNText } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Text(props) {
  return (
    <RNText {...props}>
      {props.children}
    </RNText>
  );
}

Text.propTypes = {
  ...RNText.propTypes,
};

const StyledText = connectStyle('shoutem.ui.Text', {})(Text);

const Heading = connectStyle('shoutem.ui.Heading', {})(Text);

const Title = connectStyle('shoutem.ui.Title', {})(Text);

const Subtitle = connectStyle('shoutem.ui.Subtitle', {})(Text);

const Caption = connectStyle('shoutem.ui.Caption', {})(Text);

export {
  StyledText as Text,
  Heading,
  Title,
  Subtitle,
  Caption,
};
