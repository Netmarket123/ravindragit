import React from 'react';

import { Stage } from './Stage';
import {
  Heading,
  View,
  TextInput,
} from '../index';

export function FormComponents() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">18 - Form components</Heading>

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
