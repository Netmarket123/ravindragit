import { Navigator } from 'react-native';
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator';

// No animations issue https://github.com/facebook/react-native/issues/1953
const NoTransition = {
  opacity: {
    value: 1.0,
    type: 'constant',
  },
};

export const SceneConfigs = {
  NO_TRANSITION: {
    ...Navigator.SceneConfigs.FadeAndroid,
    gestures: null,
    defaultTransitionVelocity: 1000,
    animationInterpolators: {
      into: buildStyleInterpolator(NoTransition),
      out: buildStyleInterpolator(NoTransition),
    },
  },
};
