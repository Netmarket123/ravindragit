import React, { Component } from 'react';
import { Animated } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import * as _ from 'lodash';

import { DriverShape } from './DriverShape';

const ANIMATION_SUFFIX = 'Animation';

function removeAnimationsFromStyle(style) {
  return _.reduce(style, (newStyle, styleProp) => {
    if (!_.isFunction(style[styleProp]) && _.endsWith(styleProp, ANIMATION_SUFFIX)) {
      // eslint-disable-next-line
      newStyle[styleProp] = style[styleProp];
    }

    return newStyle;
  }, {});
}
function resolveAnimatedStyle(props, driver, animations, layout) {
  const {
    style,
    animation,
    animationName,
    animationOptions,
  } = props;

  const animationResolver = animation || animations[`${animationName}${ANIMATION_SUFFIX}`] ||
    style[`${animationName}${ANIMATION_SUFFIX}`];
  if (!_.isFunction(animationResolver)) {
    throw new Error(`Animation with name: ${animationName}, you tried to assign to component
    doesn't exist. Check components style or component declaration, to find an exact error`);
  }
  const animatedStyle = animationResolver(driver, { layout, animationOptions });

  return [removeAnimationsFromStyle(style), animatedStyle];
}

/**
 * Higher order component that creates animated component which could be animated by
 * list of passed animations. Animations are ran by driver, that could be send through
 * context as animationDriver, or passed as prop named driver. Driver provides animated value.
 * Each animation is a function which takes driver and context as parameters,
 * animation name should have "Animation" suffix. Context contains animation options,
 * and component's layout.
 * Example animation:
 *
 * fadeOutAnimation(driver, context) {
 *  return {
 *    opacity: driver.value.interpolate({
 *      inputRange: [0, context.layout.height],
 *      outputRange: [1, 0]
 *    })
 *  }
 * }
 *
 * in described animation component would fadeOut when scroll is equal its height
 * @param WrappedComponent component you want to be Animated
 * @param animations collection of available animations
 */
export function connectAnimation(WrappedComponent, animations = {}) {
  const AnimatedWrappedComponent = Animated.createAnimatedComponent(WrappedComponent);

  class AnimatedComponent extends Component {
    static propTypes = {
      driver: DriverShape,
      style: React.PropTypes.object,
      animationName: React.PropTypes.string,
      animationOptions: React.PropTypes.object,
      animation: React.PropTypes.func,
    }

    static contextTypes = {
      animationDriver: DriverShape,
    }

    constructor(props, context) {
      super(props, context);
      this.onLayout = this.onLayout.bind(this);
      this.state = {
        layout: {},
      };
    }

    componentWillReceiveProps(newProps, newContext) {
      const driver = newProps.driver || newContext.driver;
      this.resolvedStyle(newProps, driver);
    }

    onLayout(event) {
      const { layout } = event.nativeEvent;
      const driver = this.props.driver || this.context.driver;
      this.setStyle({ layout }, () => this.resolveStyle(this.props, driver));
    }

    resolveStyle(props, driver) {
      this.resolvedStyle = resolveAnimatedStyle(props, driver, animations, this.state.layout);
    }

    render() {
      return (
        <AnimatedWrappedComponent
          onLayout={this.onLayout}
          {...this.props}
          style={this.resolvedStyle}
        />
      );
    }
  }

  return hoistStatics(AnimatedComponent, WrappedComponent);
}
