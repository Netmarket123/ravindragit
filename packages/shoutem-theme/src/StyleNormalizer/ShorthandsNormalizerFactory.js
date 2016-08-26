/*
    ALL_SIDES & ALL_CORNERS are created with new String('') so we can have distinction.
    Both variables has same value but they have different normalizers.
    As they are used as shorthands, it is important they are '' (empty string),
    because they represent those shorthands (i.e. margin + '').
 */
// eslint-disable-next-line
export const ALL_SIDES = new String('');
// eslint-disable-next-line
export const ALL_CORNERS = new String('');
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

// Shorthands normalizers creators.
// This creators provide standard normalizer used in most cases.
// When style property has any of this shorthands, use this creators
// to create shorthand normalizer.

function allSidesNormalizerCreator(prop, shorthand, suffix = '') {
  return (val) => ({
    [prop + LEFT + suffix]: val,
    [prop + RIGHT + suffix]: val,
    [prop + TOP + suffix]: val,
    [prop + BOTTOM + suffix]: val,
  });
}

function allCornersNormalizerCreator(prop, shorthand, suffix = '') {
  return (val) => ({
    [prop + BOTTOM_LEFT + suffix]: val,
    [prop + BOTTOM_RIGHT + suffix]: val,
    [prop + TOP_LEFT + suffix]: val,
    [prop + TOP_RIGHT + suffix]: val,
  });
}

function horizontalSidesNormalizerCreator(prop) {
  return (val) => ({
    [prop + LEFT]: val,
    [prop + RIGHT]: val,
  });
}

function verticalSidesNormalizerCreator(prop) {
  return (val) => ({
    [prop + TOP]: val,
    [prop + BOTTOM]: val,
  });
}

const normalizerCreatorMap = {
  [HORIZONTAL]: horizontalSidesNormalizerCreator,
  [VERTICAL]: verticalSidesNormalizerCreator,
};

class ShorthandsNormalizerFactory {
  getNormalizerCreator(shorthand) {
    if (ALL_SIDES === shorthand) {
      return allSidesNormalizerCreator;
    } else if (ALL_CORNERS === shorthand) {
      return allCornersNormalizerCreator;
    }
    return normalizerCreatorMap[shorthand];
  }

  create(prop, shorthand, suffix) {
    const normalizerCreator = this.getNormalizerCreator(shorthand);
    return normalizerCreator(prop, shorthand, suffix);
  }
}

export default new ShorthandsNormalizerFactory();
