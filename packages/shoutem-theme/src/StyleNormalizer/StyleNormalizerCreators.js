export const ALL = '';
export const HORIZONTAL = 'Horizontal';
export const VERTICAL = 'Vertical';
export const LEFT = 'Left';
export const RIGHT = 'Right';
export const TOP = 'Top';
export const BOTTOM = 'Bottom';
export const TOP_RIGHT = 'TopRight';
export const BOTTOM_RIGHT = 'BottomRight';
export const TOP_LEFT = 'TopLeft';
export const BOTTOM_LEFT = 'BottomLeft';

// Shorthands normalizers (transformers)

function allNormalizerCreator(prop, shorthand, type = '') {
  return (val) => ({
    [prop + LEFT + type]: val,
    [prop + RIGHT + type]: val,
    [prop + TOP + type]: val,
    [prop + BOTTOM + type]: val,
  });
}

function horizontalNormalizerCreator(prop) {
  return (val) => ({
    [prop + LEFT]: val,
    [prop + RIGHT]: val,
  });
}

function verticalNormalizerCreator(prop) {
  return (val) => ({
    [prop + TOP]: val,
    [prop + BOTTOM]: val,
  });
}

export default {
  [ALL]: allNormalizerCreator,
  [HORIZONTAL]: horizontalNormalizerCreator,
  [VERTICAL]: verticalNormalizerCreator,
};
