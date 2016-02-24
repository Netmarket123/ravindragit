// Mixins helper object
const Mixins = {
  merge,
  join,
  inject,
};

/**
 * Append childStyle to parentStyle by mutating parentStyle
 * Merges all properties
 * @param parentStyle
 * @param childStyle
 */
function mergeStyles(parentStyle, childStyle) {
  lodash.forIn(childStyle, (style, property) => {
    const themeStyleObject = parentStyle[property];
    parentStyle[property] = themeStyleObject ? Object.assign(themeStyleObject, style) : style;
  });
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
  lodash.forIn(customStyle, (style, property) => {
    if (componentStyle[property]) {
      // inject custom style to override default component
      // use react option to set component style as list of styles
      componentStyle[property] = [componentStyle[property], style];
    } else {
      componentStyle[property] = style;
    }
  });
}

export default Mixins;
