import React, {
  Dimensions,
  PixelRatio,
  Navigator,
  // buildStyleInterpolator,
} from 'react-native';

import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator';
// const buildStyleInterpolator = require('buildStyleInterpolator');
const SCREEN_WIDTH = Dimensions.get('window').width;
const BaseConfig = Navigator.SceneConfigs.PushFromRight;


const ToTheLeft = {
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  opacity: {
    from: 1.0,
    to: 1,
    min: 0,
    max: 1,
    extrapolate: true,
    type: 'linear',
  },

  translateX: {
    from: 0,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};

const FromTheRight = {
  transformTranslate: {
    from: {x: 5, y: 465, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  scale: {
    from: 0.5,
    to: 1,
    min: 0.5,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  opacity: {
    from: 1,
    to: 1,
    min: 0,
    max: 1,
    extrapolate: true,
    type: 'linear',
  },

  translateX: {
    from: 0,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};


const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,

  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

const CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tightly wound spring will make this transition fast
  springTension: 60,
  springFriction: 11,
  animationInterpolators: {
    into: buildStyleInterpolator(FromTheRight),
    out: buildStyleInterpolator(ToTheLeft),
  },
});

export default CustomSceneConfig;
