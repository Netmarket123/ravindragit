import * as _ from 'lodash';

/**
 * Merges style with custom style.
 * Flag "onlyCommon" will merge only common styles which style has with custom style.
 *
 * @param style
 * @param customStyle
 * @param onlyCommon
 */
export function mergeStyles(style, customStyle, onlyCommon = false) {
  if (onlyCommon) {
    return _.merge(_.pick(style, _.keys(customStyle)), customStyle);
  }

  return _.merge(style, customStyle);
}
