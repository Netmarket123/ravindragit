import React, { PropTypes } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import { ThemeShape } from './Theme';
import * as _ from 'lodash';

export function isReactStyle(style) {
  const styleFirstProp = Object.keys(style)[0];
  return styleFirstProp && _.isNumber(style[styleFirstProp]);
}

export function doesStyleNameContainsNamespace(styleName) {
  // TODO: Braco - create unique helper for checking extension component name
  return _.isString(styleName) && styleName.match(/\./g).length === 2;
}

/**
 * Merge component style, component custom style and theme style.
 * Updates component style if new style received from parent.
 * @param wrappedComponentStyle
 * @returns {wrapWithStyledComponent}
 */
export function connectStyle(componentStyleName, wrappedComponentStyle) {
  if (!doesStyleNameContainsNamespace(componentStyleName)) {
    // TODO: Braco - confirm warning message
    throw Error('Component name should ...(have unique namespace by dev name)');
  }

  if (isReactStyle(wrappedComponentStyle)) {
    // TODO: Braco - confirm warning message
    console.warn('Raw style should be passed, do not create style with StyleSheet.create.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrapWithStyledComponent(WrappedComponent) {
    class StyledComponent extends React.Component {
      constructor(props, context) {
        super(props, context);
        const theme = context.theme;
        this.state = {
          style: theme.createComponentStyle(componentStyleName, wrappedComponentStyle, props.style),
        };
      }
      componentWillReceiveProps(nextProps) {
        const theme = this.context.theme;
        if (nextProps.style !== this.props.style) {
          this.setState({ style: theme.updateComponentStyle(componentStyleName, nextProps.style) });
        }
        return true;
      }
      render() {
        // always passing reference so redux connect can access original component
        return <WrappedComponent {...this.props} style={this.state.style} ref="wrappedInstance" />;
      }
    }

    StyledComponent.displayName = `Styled(${getDisplayName(WrappedComponent)})`;
    StyledComponent.WrappedComponent = WrappedComponent;
    StyledComponent.contextTypes = {
      theme: ThemeShape,
    };
    StyledComponent.propTypes = {
      style: PropTypes.object,
    };

    return hoistStatics(StyledComponent, WrappedComponent);
  };
}

/**
 * Create new style by merging customStyle to style
 * @param style
 * @param customStyle
 */
export function mergeStyle(style, customStyle = {}) {
  const mergedStyle = Object.assign({}, style);
  const isStyleReactStyle = isReactStyle(style);
  const isCustomStyleReactStyle = isReactStyle(customStyle);

  _.forIn(customStyle, (customStyleValue, customStyleName) => {
    const styleValue = mergedStyle[customStyleName];

    if ((isCustomStyleReactStyle || isStyleReactStyle) && styleValue) {
      /*
       Inject custom style to override default style.
       Use react option to set component style as list of styles.
       */
      mergedStyle[customStyleName] = [styleValue, customStyleValue];
    } else if (isCustomStyleReactStyle && !styleValue) {
      // customStyleValue is number & styleValue doesn't exists
      mergedStyle[customStyleName] = customStyleValue;
    } else if (styleValue) {
      // customStyleValue & styleValue are not numbers (are objects)
      mergedStyle[customStyleName] = Object.assign(styleValue, customStyleValue);
    } else {
      // styleValue doesn't exists & customStyleValue is object
      mergedStyle[customStyleName] = Object.assign({}, customStyleValue);
    }
  });

  return mergedStyle;
}
