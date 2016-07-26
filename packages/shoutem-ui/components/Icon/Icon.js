/**
 * Icon component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */

import { Animated as RNAnimated } from 'react-native';
import { connectStyle } from '@shoutem/theme';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './config.json';


const IconComponent = createIconSetFromIcoMoon(icoMoonConfig);
export const Icon = connectStyle('shoutem.ui.Icon', {})(IconComponent);

const AnimatedIcon = RNAnimated.createAnimatedComponent(IconComponent);
const Animated = {
  Icon: connectStyle('shoutem.ui.Animated.Icon', {})(AnimatedIcon),
};

export {
  Animated,
};
