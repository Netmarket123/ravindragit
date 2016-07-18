import React, { Component } from 'react';
import { Animated } from 'react-native';

import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Title } from '../components/Text';

import Share from 'react-native-share';
import * as _ from 'lodash';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTitle = Animated.createAnimatedComponent(Title);

const transformers = {
  title: (value, props) => {
    return {
      centerComponent: <AnimatedTitle styleName="navigationBarTitle" numberOfLines={1}>{value}</AnimatedTitle>
    };
  },
  share: (value, props) => {
    const onShare = () =>
      Share.open({
        title: value.title || props.title,
        share_text: value.text,
        share_URL: value.link,
      }, (sharingError) => {
        console.error(sharingError);
      });

    return {
      rightComponent: (
        <Button onPress={onShare}>
          <AnimatedIcon name="share" />
        </Button>
      ),
    };
  },
  hasHistory: (value, props) => {
    const { navigateBack } = props;

    /**
     * onPress sets `event` as first param, which leads to ignoring default navigateBack
     * first argument (navigator) so we have to wrap navigateBack into function to leave first
     * argument empty, default
     */
    function navigateBackWithoutEventParameter() {
      navigateBack();
    }

    const leftComponent = value ? (
      <Button
        styleName="clear"
        onPress={navigateBackWithoutEventParameter}
      >
        <AnimatedIcon name="back" />
      </Button>
    ) : null;

    return { leftComponent };
  },
  animation: (value, props) => {
    return { style: value.style };
  },
};

export default withTransformedProps = NavigationBarComponent => class extends Component {
  render() {
    const newProps = {};
    const { props } = this;
    const { style, animation } = props;

    if (animation) {
      const backgroundColor = _.get(style, 'container.backgroundColor');
      const textColor = _.get(style, 'container.color');

      animation.setColors(backgroundColor, textColor);
    }

    _.forEach(props, (value, key) => {
      if (_.isFunction(transformers[key])) {
        _.assign(newProps, transformers[key](value, props));
      }
    });

    return <NavigationBarComponent {...(_.assign(newProps, props))} />;
  }
};
