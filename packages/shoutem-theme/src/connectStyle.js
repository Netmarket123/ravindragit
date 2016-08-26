import React, { PropTypes, Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import * as _ from 'lodash';

import Theme, { ThemeShape } from './Theme';
import { resolveComponentStyle } from './resolveComponentStyle';

/**
 * Formats and throws an error when connecting component style with the theme.
 *
 * @param errorMessage The error message.
 * @param componentDisplayName The name of the component that is being connected.
 */
function throwConnectStyleError(errorMessage, componentDisplayName) {
  throw Error(`${errorMessage} - when connecting ${componentDisplayName} component to style.`);
}

/**
 * Returns the theme object from the provided context,
 * or an empty theme if the context doesn't contain a theme.
 *
 * @param context The React component context.
 * @returns {Theme} The Theme object.
 */
function getTheme(context) {
  // Fallback to a default theme if the component isn't
  // rendered in a StyleProvider.
  return context.theme || Theme.getDefaultThemeStyle();
}

/**
 * Resolves the final component style by using the theme style, if available and
 * merging it with the style provided directly through the style prop, and style
 * variants applied through the styleName prop.
 *
 * @param componentStyleName The component name that will be used
 * to target this component in style rules.
 * @param componentStyle The default component style.
 * @param options The additional connectStyle options
 * @param options.virtual The default value of the virtual prop
 * @returns {StyledComponent} The new component that will handle
 * the styling of the wrapped component.
 */
export default function connectStyle(componentStyleName, componentStyle = {}, options) {
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

    if (!_.isString(componentStyleName)) {
      throwConnectStyleError(
        'Component Style Name must be string',
        componentDisplayName
      );
    }

    class StyledComponent extends React.Component {
      static contextTypes = {
        theme: ThemeShape,
        // The style inherited from the parent
        parentStyle: PropTypes.object,
      };

      static childContextTypes = {
        // Provide the parent style to child components
        parentStyle: PropTypes.object,
      };

      static propTypes = {
        // Element style that overrides any other style of the component
        style: PropTypes.object,
        // The style variant names to apply to this component,
        // multiple variants may be separated with a space character
        styleName: PropTypes.string,
        // Virtual elements will propagate the parent
        // style to their children, i.e., the children
        // will behave as they are placed directly below
        // the parent of a virtual element.
        virtual: PropTypes.bool,
      };

      static defaultProps = {
        virtual: options && options.virtual || false,
      };

      static displayName = `Styled(${componentDisplayName})`;
      static WrappedComponent = WrappedComponent;

      constructor(props, context) {
        super(props, context);
        const resolvedStyle = this.resolveStyle(context, props);
        this.state = {
          style: resolvedStyle.componentStyle,
          childrenStyle: resolvedStyle.childrenStyle,
        };
        if (isComponentReferenceable(WrappedComponent)) {
          this.state.ref = 'wrappedInstance';
        }
      }

      getChildContext() {
        const { virtual } = this.props;
        return {
          parentStyle: virtual ?
            this.context.parentStyle :
            this.state.childrenStyle,
        };
      }

      componentWillReceiveProps(nextProps, nextContext) {
        if (this.shouldRebuildStyle(nextProps, nextContext)) {
          const resolvedStyle = this.resolveStyle(nextContext, nextProps);
          this.setState({
            style: resolvedStyle.componentStyle,
            childrenStyle: resolvedStyle.childrenStyle,
          });
        }
      }

      shouldRebuildStyle(nextProps, nextContext) {
        return (nextProps.style !== this.props.style) ||
          (nextProps.styleName !== this.props.styleName) ||
          (nextContext.theme !== this.context.theme) ||
          (nextContext.parentStyle !== this.context.parentStyle);
      }

      resolveStyle(context, props) {
        const { parentStyle } = context;
        const { style, styleName } = props;

        const theme = getTheme(context);
        const themeStyle = theme.createComponentStyle(componentStyleName, componentStyle);
        return resolveComponentStyle(
          componentStyleName,
          styleName,
          themeStyle,
          parentStyle,
          style
        );
      }

      render() {
        // If the component is a class component, it can be initialised with JSX
        if (isClassComponent(WrappedComponent)) {
          return <WrappedComponent {...this.props} style={this.state.style} />;
        }

        // TODO(Braco) - check if this different Component creation for func and class is needed
        // for React > 0.15. In React > 0.15, func components should be able to render `null`

        // otherwise initialize function component as function for case it returns null
        // https://github.com/facebook/react/issues/4599
        // eslint-disable-next-line new-cap
        return WrappedComponent({
          ...this.props,
          style: this.state.style,
        });
      }
    }

    return hoistStatics(StyledComponent, WrappedComponent);
  };
}
