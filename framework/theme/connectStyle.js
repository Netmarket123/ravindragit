import React, { PropTypes, Component } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import { ThemeShape } from './Theme';
import * as _ from 'lodash';

/**
 * Used to check if provided style is optimised with react-native StyleSheet.create
 * @param style
 */
function isReactStyle(style) {
  const styleFirstProp = Object.keys(style)[0];
  return styleFirstProp && _.isNumber(style[styleFirstProp]);
}
/**
 * Formats and throws error if any occurs when connecting component style with theme.
 * @param errorText
 * @param componentDisplayName
 */
function throwConnectStyleError(errorText, componentDisplayName) {
  throw Error(`${errorText} - when style connecting ${componentDisplayName} component.`);
}

/**
 * Connects component style with theme style.
 * Provides merged style to connected component through component props, using "style" prop.
 * Updates component style if new (custom) style received from parent.
 *
 * Merges the styles in the following order (lower numbers override the higher ones):
 * 1. Custom style passed from parent
 * 2. Theme component style
 * 3. Component style
 * 4. Theme root style, defined at component style
 *
 * @param componentStyle
 * @returns {StyledComponent}
 */
export default function connectStyle(componentStyleName, componentStyle) {
  function getComponentDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  function isClassComponent(WrappedComponent) {
    return WrappedComponent.prototype instanceof Component;
  }
  function isComponentReferenceable(WrappedComponent) {
    // stateless function components can't be referenced
    // only Component instance can
    return isClassComponent(WrappedComponent);
  }

  return function wrapWithStyledComponent(WrappedComponent) {
    const componentDisplayName = getComponentDisplayName(WrappedComponent);

    if (!_.isPlainObject(componentStyle)) {
      throwConnectStyleError(
        'Component style must be plain object',
        componentDisplayName
      );
    }
    if (isReactStyle(componentStyle)) {
      throwConnectStyleError(
        'Raw style should be passed, do not create style with StyleSheet.create',
        componentDisplayName
      );
    }
    if (!_.isString(componentStyleName)) {
      throwConnectStyleError(
        'Component Style Name must be string',
        componentDisplayName
      );
    }

    class StyledComponent extends React.Component {
      static contextTypes = {
        theme: ThemeShape.isRequired,
      };
      static propTypes = {
        style: PropTypes.object,
      };
      static displayName = `Styled(${componentDisplayName})`;
      static WrappedComponent = WrappedComponent;

      constructor(props, context) {
        super(props, context);
        const theme = context.theme;
        this.state = {
          style: theme.resolveComponentStyle(componentStyleName, componentStyle, props.style),
        };
        if (isComponentReferenceable(WrappedComponent)) {
          this.state.ref = 'wrappedInstance';
        }
      }

      componentWillReceiveProps(nextProps, nextContext) {
        const theme = this.context.theme;
        /**
         * If component gets custom style from parent, whenever that style changes,
         * component will resolve new style for it self.
         * Also, if component gets custom style from parent, it will get new custom style whenever
         * theme changes so it doesn't have to resolve it self style on Theme change.
         *
         * If component doesn't have custom style, when Theme changes,
         * it will resolve new style for it self.
         */
        if (
          (nextProps.style !== this.props.style) ||
          (!nextProps.style && nextContext.theme !== theme)
        ) {
          this.setState({
            style: theme.resolveComponentStyle(componentStyleName, componentStyle, nextProps.style),
          });
        }
        return true;
      }

      render() {
        /**
         * Redux connect has option to pass ref of wrapped component if it will be needed.
         * To remove this additional option, we are always passing ref so developer doesn't
         * have to think about it or define this option when connecting style.
         * Redux connect requires option "withRef" to be able to get component ref.
         */

        // if component has ref it is a class component and it can be initialised with JSX
        if (isClassComponent(WrappedComponent)) {
          return <WrappedComponent {...this.props} {...this.state} />;
        }

        // otherwise initialize function component as function for case it returns null
        // https://github.com/facebook/react/issues/4599
        // eslint-disable-next-line new-cap
        return WrappedComponent({
          ...this.props,
          ...this.state,
        });
      }
    }

    return hoistStatics(StyledComponent, WrappedComponent);
  };
}
