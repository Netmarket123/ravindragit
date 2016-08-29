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
import { DropDownMenus } from './DropDownMenu';
import { FormComponents } from './FormComponents';
import { Headers } from './Headers';
import { NavigationBars } from './NavigationBars';

export function Examples() {
  return (
    <ScrollView>
      <Typography />
      <NavigationBars />
      <DropDownMenus />
      <Dividers />
      <Cards />
      <Rows />
      <Tiles />
      <Headers />
      <Spinners />
      <Buttons />
      <Images />
      <FormComponents />
    </ScrollView>
  );
}
