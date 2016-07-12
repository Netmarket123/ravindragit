import React, { Component } from 'react';

import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Title } from '../components/Text';

import Share from 'react-native-share';
import * as _ from 'lodash';

const transformers = {
  title: (value) => {
    return {
      centerComponent: <Title styleName="navigationBarTitle">{value}</Title>
    };
  },
  share: (value) => {
    const onShare = () => {
      return Share.open({
        title: value.title,
        share_text: value.text,
        share_URL: value.link,
      }, (sharingError) => {
        console.error(sharingError);
      });
    };
    return {
      rightComponent: (
        <Button onPress={onShare} style={{ marginTop: -5 }}>
          <Icon name="share"></Icon>
        </Button>
      )
    };
  }
};

export default function transformNavigationBarProps(props) {
  let newProps = {};
  _.forEach(props, (value, key) => {
      if (_.isFunction(transformers[key])) {
        _.assign(newProps, transformers[key](value));
      }
  });

  return _.assign(newProps, props);
}
