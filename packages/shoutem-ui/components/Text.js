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

const StyledText = connectStyle('shoutem.ui.Text', {})(Text);

const Heading = connectStyle('shoutem.ui.Heading', {})(Text);

const Title = connectStyle('shoutem.ui.Title', {})(Text);

const Subtitle = connectStyle('shoutem.ui.Subtitle', {})(Text);

const Caption = connectStyle('shoutem.ui.Caption', {})(Text);

function AnimatedText(props) {
  return (
    <RNAnimated.Text {...props}>
      {props.children}
    </RNAnimated.Text>
  );
}

AnimatedText.propTypes = {
  ...RNText.propTypes,
};

const Animated = {
  Text: connectStyle('shoutem.ui.Animated.Text', textStyle)(AnimatedText),

  Heading: connectStyle('shoutem.ui.Animated.Heading', {
    ...textStyle,
    color: '#222222',
    fontSize: 25,
  })(AnimatedText),

  Title: connectStyle('shoutem.ui.Animated.Title', {
    ...textStyle,
    color: '#222222',
    fontSize: 20,
    lineHeight: 24,
    '.navigationBarTitle': {
      fontSize: 15,
      lineHeight: 18,
    },
  })(AnimatedText),

  Subtitle: connectStyle('shoutem.ui.Animated.Subtitle', {
    ...textStyle,
    color: '#222222',
    fontSize: 15,
  })(AnimatedText),

  Caption: connectStyle('shoutem.ui.Animated.Caption', {
    ...textStyle,
    color: '#555555',
    fontSize: 12,
  })(AnimatedText),
};

export {
  StyledText as Text,
  Heading,
  Title,
  Subtitle,
  Caption,
  Animated,
};
