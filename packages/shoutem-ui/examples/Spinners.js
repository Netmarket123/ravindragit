import React from 'react';

import { Stage } from './Stage';
import {
  Heading,
  View,
  Spinner,
} from '../index';

export function Spinners() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">14 - Spinner</Heading>

      <Stage title="Spinner">
        <Spinner />
      </Stage>
    </View>
  );
}
