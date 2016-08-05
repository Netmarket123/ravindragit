import React from 'react';
import { Text as RNText, Animated as RNAnimated } from 'react-native';

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

const StyledText = connectStyle('shoutem.ui.Text')(Text);
const Heading = connectStyle('shoutem.ui.Heading')(Text);
const Title = connectStyle('shoutem.ui.Title')(Text);
const Subtitle = connectStyle('shoutem.ui.Subtitle')(Text);
const Description = connectStyle('shoutem.ui.Description')(Text);
const Caption = connectStyle('shoutem.ui.Caption')(Text);

const Animated = {
  Text: RNAnimated.createAnimatedComponent(StyledText),
  Heading: RNAnimated.createAnimatedComponent(Heading),
  Title: RNAnimated.createAnimatedComponent(Title),
  Subtitle: RNAnimated.createAnimatedComponent(Subtitle),
  Description: RNAnimated.createAnimatedComponent(Description),
  Caption: RNAnimated.createAnimatedComponent(Caption),
};

export {
  StyledText as Text,
  Heading,
  Title,
  Subtitle,
  Description,
  Caption,
  Animated,
};
