import React, {
  Component,
} from 'react';
import {
  Subtitle,
  Button,
  View,
  Text,
  Icon,
} from '@shoutem/ui';

import { connectStyle } from '@shoutem/theme';

class EmptyStateView extends Component {
  static defaultProps = {
    retryButtonTitle: 'TRY AGAIN',
    icon: 'error',
  }

  constructor(props) {
    super(props);
    this.onRetry = this.onRetry.bind(this);
    this.renderRetryButton = this.renderRetryButton.bind(this);
  }

  onRetry() {
    this.props.onRetry();
  }

  renderRetryButton() {
    const { retryButtonTitle } = this.props;
    // Show retry button at the bottom only if
    // there is a onRetry action passed.
    return (
      <View styleName="horizontal anchor-bottom">
        <Button styleName="full-width" onPress={this.onRetry}>
          <Text>{retryButtonTitle}</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { icon, message, onRetry } = this.props;

    return (
      <View
        {...this.props}
        styleName="vertical flexible h-center v-center"
      >
        <View styleName="icon-placeholder">
          <Icon name={icon} />
        </View>

        <Subtitle styleName="h-center">{message}</Subtitle>

        {onRetry ? this.renderRetryButton() : null}
      </View>
    );
  }
}

EmptyStateView.propTypes = {
  ...EmptyStateView.propTypes,
  onRetry: React.PropTypes.func,
  message: React.PropTypes.string,
  icon: React.PropTypes.string,
};

const StyledView = connectStyle('shoutem.ui.EmptyStateView')(EmptyStateView);

export {
  StyledView as EmptyStateView,
};
