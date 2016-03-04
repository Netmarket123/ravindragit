import lodash from 'lodash';

/**
 * Append childStyle to parentStyle by mutating parentStyle
 * Merges all properties
 * @param parentStyle
 * @param childStyle
 */
function merge(parentStyle, childStyle) {
  const finalStyle = parentStyle;
  lodash.forIn(childStyle, (style, property) => {
    const themeStyleObject = parentStyle[property];
    finalStyle[property] = themeStyleObject ? Object.assign(themeStyleObject, style) : style;
  });
  return finalStyle;
}

/**
 * Joins passed styles to new style by copying properties
 * Overrides property with same property from next child
 * @param ...{}
 * @returns {}
 */
function join() {
  return Object.assign({}, ...arguments);
}

/**
 * Injects customStyle to componentStyle by mutating componentStyle
 * Uses react option to set component style as list of styles
 * @param componentStyle
 * @param customStyle
 */
function inject(componentStyle, customStyle) {
  const finalStyle = componentStyle;
  lodash.forIn(customStyle, (style, property) => {
    if (componentStyle[property]) {
      // inject custom style to override default component
      // use react option to set component style as list of styles
      finalStyle[property] = [componentStyle[property], style];
    } else {
      finalStyle[property] = style;
    }
  });
  return finalStyle;
}

// Mixins helper object
const Mixins = {
  merge,
  join,
  inject,
};

export default Mixins;
