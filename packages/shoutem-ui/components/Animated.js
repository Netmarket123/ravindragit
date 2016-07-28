import { Animated as AnimatedIcon } from './Icon';
import { Animated as AnimatedText } from './Text';
import { Animated as AnimatedView } from './View';
import { Animated as AnimatedImage } from './Image';

export const Animated = {
  ...AnimatedIcon,
  ...AnimatedImage,
  ...AnimatedText,
  ...AnimatedView,
};
