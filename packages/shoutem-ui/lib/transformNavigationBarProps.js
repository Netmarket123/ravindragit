import React, { Component } from 'react';

import { Button } from '../components/Button';
import { Animated } from '../components/Animated';

import Share from 'react-native-share';
import * as _ from 'lodash';

const transformers = {
  title: (value, props) => {
    return {
      centerComponent: <Animated.Title styleName="navigationBarTitle" numberOfLines={1}>{value}</Animated.Title>
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
          <Animated.Icon name="share" />
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
        <Animated.Icon name="back" />
      </Button>
    ) : null;

    return { leftComponent };
  },
  animation: (value, props) => {
    const containerStyle = {
      backgroundColor: value.style.backgroundColor,
      borderBottomColor: value.style.borderBottomColor,
    };
    return {
      style: {
        container: { ...containerStyle },
      },
    };
  },
};

export default withTransformedProps = NavigationBarComponent => class extends Component {
  render() {
    const newProps = {};
    const { props } = this;
    const { style, animation } = props;

    if (animation) {
      const backgroundColor = _.get(style, 'container.backgroundColor');
      const textColor = _.get(style, 'textColor.color');

      animation.setColors(backgroundColor, textColor);
    }

    _.forEach(props, (value, key) => {
      if (_.isFunction(transformers[key])) {
        _.assign(newProps, transformers[key](value, props));
      }
    });

    if (newProps.style) {
      props.style = _.merge(props.style, newProps.style);
    }

    return <NavigationBarComponent {...(_.assign(newProps, props))} />;
  }
};
