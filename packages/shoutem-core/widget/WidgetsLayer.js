import React from 'react';
import { View } from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import _ from 'lodash';

// eslint-disable-next-line react/prefer-stateless-func
class WidgetsLayer extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
    widgets: React.PropTypes.object,
  };

  renderWidgets() {
    return _.reduce(this.props.widgets, (widgets, renderedWidget) => {
      widgets.push(renderedWidget);
      return widgets;
    }, []);
  }

  render() {
    const { style, children } = this.props;
    return (
      <View style={style.container} virtual>
        {children}
        {this.renderWidgets()}
      </View>
    );
  }
}

const widgetStyle = {
  container: {
    flex: 1,
  },
};

const styleOptions = { virtual: true };
const StyledWidgetsLayer =
  connectStyle('shoutem.core.WidgetsLayer', widgetStyle, undefined, styleOptions)(WidgetsLayer);

export {
  StyledWidgetsLayer as WidgetsLayer,
};
