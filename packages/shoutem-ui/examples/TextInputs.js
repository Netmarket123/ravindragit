import React from 'react';

import { Stage } from './Stage';
import {
  Heading,
  View,
  TextInput,
} from '../index';

export function TextInputs() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">00 - TextInputs</Heading>

      <Stage title="TextInput / Full width">
        <TextInput
          placeholder="Username or Email"
        />
      </Stage>
      <Stage title="TextInput  / Full width secure entry">
        <TextInput
          placeholder="Password"
          secureTextEntry
        />
      </Stage>

    </View>
  );
}
