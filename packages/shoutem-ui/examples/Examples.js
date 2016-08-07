import React from 'react';
import {
  ScrollView,
} from 'react-native';

import { Typography } from './Typography';
import { Images } from './Images';
import { Cards } from './Cards';
import { Tiles } from './Tiles';

export function Examples() {
  return (
    <ScrollView>
      <Typography />
      <Cards />
      <Tiles />
      <Images />
    </ScrollView>
  );
}
