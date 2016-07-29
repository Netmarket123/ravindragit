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

const Animated = {
  Icon: RNAnimated.createAnimatedComponent(Icon),
};

export {
  Animated,
};
