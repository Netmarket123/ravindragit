import * as _ from 'lodash';

/**
 * Merges style with custom style.
 * Omit only merges common styles.
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
