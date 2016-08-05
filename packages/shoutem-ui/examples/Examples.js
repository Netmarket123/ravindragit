import React from 'react';
import {
  ScrollView,
} from 'react-native';

import { Typography } from './Typography';
import { Images } from './Images';

export function Examples() {
  return (
    <ScrollView>
      <Images />
      <Typography />
    </ScrollView>
  );
}
