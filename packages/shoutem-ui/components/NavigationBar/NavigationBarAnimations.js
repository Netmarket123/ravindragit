import * as _ from 'lodash';

function getStandardBackgroundColor(style) {
  return _.get(style, 'container.backgroundColor');
}

function getStandardBorderColor(style) {
  return _.get(style, 'container.borderBottomColor') || 'rgba(242,242,242,1)';
}

const presetColorsResolvers = {
  clearToStandard: (style) => {
    const backgroundColor = ['rgba(0,0,0,0)', getStandardBackgroundColor(style)];
    const textColor = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
    const borderColor = ['rgba(0,0,0,0)', getStandardBorderColor(style)];

    return {
      backgroundColor,
      textColor,
      borderColor,
    };
  },
  borderAndTitle: (style) => {
    const textColor = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
    const borderColor = ['rgba(0,0,0,0)', getStandardBorderColor(style)];

    return {
      textColor,
      borderColor,
    };
  },
};

class ColorAnimation {
  constructor(options) {
    if (!_.isUndefined(options.preset) && !_.isFunction(this[options.preset])) {
      throw new Error(`Color animation preset:(${options.preset})
        you tried to create doesn't exist`);
    }
    this.preset = options.preset;
    this.animatedValue = options.driver.value;
    const { startAt = 0, finishAt = 150 } = options;
    this.inputRange = options.inputRange || [startAt, finishAt];
    this.style = {};

    if (!this.preset) {
      this.sanitize();
    }
  }

  sanitize() {
    _.forEach(this.colors, (colorRange) => {
      if (this.colors[colorRange].length !== this.inputRange.length) {
        throw new Error(`Length of ${colorRange} color animation property
        ([${this.colors[colorRange]}]) is not equal to given inputRange ${this.inputRange}`);
      }
    });
  }

  calculateAnimation(navigationBarStyle) {
    if (this.preset) {
      if (!this.colors) {
        this.setColors(presetColorsResolvers[this.preset](navigationBarStyle));
      }
      this.style = this[this.preset]();
      return;
    }

    const {
      animatedValue,
      inputRange,
    } = this;

    this.sanitize();

    this.style = {
      color: animatedValue.interpolate({
        inputRange,
        outputRange: this.colors.textColor,
        extrapolate: 'clamp',
      }),
      backgroundColor: animatedValue.interpolate({
        inputRange,
        outputRange: this.colors.backgroundColor,
        extrapolate: 'clamp',
      }),
      borderBottomColor: animatedValue.interpolate({
        inputRange,
        outputRange: this.colors.borderColor,
        extrapolate: 'clamp',
      }),
    };
  }

  setColors(colors) {
    this.colors = colors;
  }

  clearToStandard() {
    const startAt = _.first(this.inputRange);
    const finishAt = _.last(this.inputRange);
    const { textColor, backgroundColor, borderColor } = this.colors;
    const animatedValue = this.animatedValue;
    return {
      color: animatedValue.interpolate({
        inputRange: [0.8 * finishAt, finishAt],
        outputRange: textColor,
        extrapolate: 'clamp',
      }),
      backgroundColor: animatedValue.interpolate({
        inputRange: [startAt, finishAt],
        outputRange: backgroundColor,
        extrapolate: 'clamp',
      }),
      borderBottomColor: animatedValue.interpolate({
        inputRange: [finishAt / 2, finishAt],
        outputRange: borderColor,
        extrapolate: 'clamp',
      }),
    };
  }

  borderAndTitle() {
    const startAt = _.first(this.inputRange);
    const finishAt = _.last(this.inputRange);
    const animatedValue = this.animatedValue;
    const { textColor, borderColor } = this.colors;
    return {
      color: animatedValue.interpolate({
        inputRange: [startAt, finishAt],
        outputRange: textColor,
        extrapolate: 'clamp',
      }),
      borderBottomColor: animatedValue.interpolate({
        inputRange: [startAt, finishAt],
        outputRange: borderColor,
        extrapolate: 'clamp',
      }),
    };
  }
}

export const NavigationBarAnimations = {
  ColorAnimation,
};
