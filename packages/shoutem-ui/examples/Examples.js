import React from 'react';
import {
  ScrollView,
} from 'react-native';

import { Typography } from './Typography';
import { Dividers } from './Dividers';
import { Rows } from './Rows';
import { Cards } from './Cards';
import { Tiles } from './Tiles';
import { Spinners } from './Spinners';
import { Buttons } from './Buttons';
import { Images } from './Images';
import { TextInputs } from './TextInputs';
import { Headers } from './Headers';

export function Examples() {
  return (
    <ScrollView>
      <TextInputs />
      <Typography />
      <Dividers />
      <Cards />
      <Rows />
      <Tiles />
      <Headers />
      <Spinners />
      <Buttons />
      <Images />
    </ScrollView>
  );
}
