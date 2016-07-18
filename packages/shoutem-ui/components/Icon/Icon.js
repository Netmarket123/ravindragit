/**
 * Icon component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */

import { Animated as RNAnimated } from 'react-native';
import { connectStyle } from '@shoutem/theme';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './config.json';

const style = {
  '.rounded-overlay': {
    backgroundColor: '#333333',
    color: 'white',
    opacity: 0.7,
    fontSize: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    padding: 7,
  },

  backgroundColor: 'rgba(0, 0, 0, 0)',
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 24,
};

const IconComponent = createIconSetFromIcoMoon(icoMoonConfig);
export const Icon = connectStyle('shoutem.ui.Icon', style)(IconComponent);

const AnimatedIcon = RNAnimated.createAnimatedComponent(IconComponent);
const Animated = {
  Icon: connectStyle('shoutem.ui.Animated.Icon', style)(AnimatedIcon),
};

export {
  Animated,
};
