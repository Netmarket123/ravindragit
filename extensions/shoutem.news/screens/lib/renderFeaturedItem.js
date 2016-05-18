import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { NewsGridBox } from 'shoutem.ui';

export default (item, style, onPress) => (
  <TouchableOpacity onPress={onPress} key={item.id}>
    <NewsGridBox
      backgroundImage={{ uri: _.get(item, 'image.url') }}
      headline={item.title.toUpperCase()}
      infoFields={['News', 'Sprint 6']}
      style={style.featuredItem}
    />
  </TouchableOpacity>
);
