import React, { Component } from 'react';

import { Button } from '../Button';
import { Animated } from '../Animated';

import Share from 'react-native-share';
import * as _ from 'lodash';

const composers = {
  title: (value, props) => {
    return {
      centerComponent: (
        <Animated.Title style={{ color: _.get(props, 'animation.style.color') }} numberOfLines={1}>
          {value || ''}
        </Animated.Title>
      ),
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
          <Animated.Icon style={{ color: _.get(props, 'animation.style.color') }} name="back" />
        </Button>
      ) :
      null;

    return { leftComponent };
  },
  animation: (value, props) => {
    value.calculateAnimation(props.style);

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

export default composeChildren = NavigationBarComponent => class extends Component {
  render() {
    let newProps = _.assign({}, this.props);
    const { id, style } = this.props;

    if (!id) {
      return null;
    }

    _.forEach(newProps, (value, key) => {
      if (_.isFunction(composers[key])) {
        _.assign(newProps, composers[key](value, newProps));
      }
    });

    if (newProps.style) {
      newProps.style = _.merge({}, style, newProps.style);
    }

    return <NavigationBarComponent {...newProps} />;
  }
};
