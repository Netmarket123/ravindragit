/**
 * Icon component.
 * Usage: <Icon name="icon-name" size={20} color="#4F8EF7" />
 */

import { connectStyle } from '@shoutem/theme';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './config.json';

export const Icon = connectStyle('shoutem.ui.Icon', {})(createIconSetFromIcoMoon(icoMoonConfig));
