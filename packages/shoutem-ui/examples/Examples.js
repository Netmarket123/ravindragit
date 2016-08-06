import React from 'react';
import {
  ScrollView,
} from 'react-native';

import { Typography } from './Typography';
import { Images } from './Images';
import { Cards } from './Cards';

export function Examples() {
  return (
    <ScrollView>
      <Typography />
      <Cards />
      <Images />
    </ScrollView>
  );
}
