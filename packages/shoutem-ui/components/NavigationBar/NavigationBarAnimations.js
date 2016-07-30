import * as _ from 'lodash';

function getStandardBackgroundColor(style) {
  return _.get(style, 'container.backgroundColor');
}

const presetColorsResolvers = {
  clearToStandard: (style) => {
    const backgroundColor = ['rgba(0,0,0,0)', getStandardBackgroundColor(style)];
    const textColor = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
    const borderColor = ['rgba(0,0,0,0)', 'rgba(51, 51, 51, 0.2)'];

    return {
      backgroundColor,
      textColor,
      borderColor,
    };
  },
  borderAndTitle: (style) => {
    const textColor = ['rgba(0,0,0,0)', _.get(style, 'shoutem.ui.Text.color') ||
    _.get(style, 'shoutem.ui.Icon.color') ||
    _.get(style, 'shoutem.ui.Title.color')];
    const borderColor = ['rgba(0,0,0,0)', 'rgba(51, 51, 51, 0.2)'];

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
    const startAt = this.startAt || 0;
    const finishAt = this.finishAt || 150;
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
    const finishAt = this.finishAt || 150;
    const startAt = this.startAt || finishAt - 70;
    const animatedValue = this.animatedValue;
    return {
      color: animatedValue.interpolate({
        inputRange: [startAt, finishAt],
        outputRange: this.colors.textColor,
        extrapolate: 'clamp',
      }),
      borderBottomColor: animatedValue.interpolate({
        inputRange: [startAt, finishAt],
        outputRange: this.colors.borderColor,
        extrapolate: 'clamp',
      }),
    };
  }
}

export const NavigationBarAnimations = {
  ColorAnimation,
};
