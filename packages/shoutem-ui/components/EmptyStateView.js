import React, {
  Component,
} from 'react';
import {
  Dimensions,
} from 'react-native';
import {
  Caption,
  Subtitle,
  Button,
  Icon,
  View,
} from '@shoutem/ui';

import { connectStyle } from '@shoutem/theme';

const window = Dimensions.get('window');

const style = {
  container: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },

  retryButton: {
    position: 'absolute',
    bottom: 0,
    width: window.width,
    height: 55,
  },

  textMessage: {
    width: 120,
  },

  iconPlaceholder: {
    height: 62,
    width: 62,
    backgroundColor: 'rgba(3, 3, 3, 0.1)',
    borderRadius: 31,
  },
};

class EmptyStateView extends Component {
  constructor(props) {
    super(props);
    this.onRetryPress = this.onRetryPress.bind(this);
    this.renderRetryButton = this.renderRetryButton.bind(this);
  }

  onRetryPress() {
    this.props.onRetryPress();
  }

  renderRetryButton() {
    // Show retry button at the bottom only if
    // there is a onRetryPress action passed.
    return (
      <Button onPress={this.onRetryPress} style={style.retryButton}>
        <Caption styleName="bold">TRY AGAIN</Caption>
      </Button>
    );
  }

  renderScreen() {
    const { iconName, textMessage, onRetryPress } = this.props;

    return (
      <View {...this.props} styleName="centered" style={style.container}>
        <View styleName="collapsed centered" style={style.iconPlaceholder}>
          <Icon name={iconName} />
        </View>

        <Subtitle styleName="md-gutter-top centered" style={style.textMessage}>
          {textMessage}
        </Subtitle>

        {onRetryPress ? this.renderRetryButton() : null}
      </View>
    );
  }

  render() {
    const { iconName, textMessage, onRetryPress } = this.props;

    return (
      <View {...this.props} styleName="centered" style={style.container}>
        <View styleName="collapsed centered" style={style.iconPlaceholder}>
          {this.props.children}
        </View>

        <Subtitle styleName="md-gutter-top centered" style={style.textMessage}>
          {textMessage}
        </Subtitle>

        {onRetryPress ? this.renderRetryButton() : null}
      </View>
    );
  }
}

EmptyStateView.propTypes = {
  ...EmptyStateView.propTypes,
  onRetryPress: React.PropTypes.func,
  textMessage: React.PropTypes.string,
  iconName: React.PropTypes.string,
};

const StyledView = connectStyle('shoutem.ui.EmptyStateView', style)(EmptyStateView);

export {
  StyledView as EmptyStateView,
};
