import React, {
  Component,
} from 'react';
import {
  Subtitle,
  Button,
  View,
  Text,
} from '@shoutem/ui';

import { connectStyle } from '@shoutem/theme';

class EmptyStateView extends Component {
  static defaultProps = {
    retryButtonTitle: 'TRY AGAIN',
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
      <Button styleName="full-width" onPress={this.onRetry}>
        <Text>{retryButtonTitle}</Text>
      </Button>
    );
  }

  render() {
    const { message, onRetry } = this.props;

    return (
      <View
        {...this.props}
        styleName="vertical flexible h-center v-center"
      >
        <View styleName="icon-placeholder">
          {this.props.children}
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
};

const StyledView = connectStyle('shoutem.ui.EmptyStateView')(EmptyStateView);

export {
  StyledView as EmptyStateView,
};
