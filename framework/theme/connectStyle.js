import React, { PropTypes } from 'react-native';
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
  if (isReactStyle(componentStyle)) {
    throw Error('Raw style should be passed, do not create style with StyleSheet.create.');
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
          style: theme.resolveComponentStyle(componentStyleName, componentStyle, props.style),
        };
      }

      componentWillReceiveProps(nextProps) {
        const theme = this.context.theme;
        if (nextProps.style !== this.props.style) {
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
