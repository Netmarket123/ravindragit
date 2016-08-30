import React, {
  Component,
} from 'react';
import {
  View as RNView,
} from 'react-native';
import {
  Caption,
  Subtitle,
  Button,
  View,
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
      <Button onPress={this.onRetry}>
        <Caption>{retryButtonTitle}</Caption>
      </Button>
    );
  }

  render() {
    const { message, onRetry } = this.props;

    return (
      <RNView {...this.props}>
        <View styleName="icon-placeholder">
          {this.props.children}
        </View>

        <Subtitle>{message}</Subtitle>

        {onRetry ? this.renderRetryButton() : null}
      </RNView>
    );
  }
}

EmptyStateView.propTypes = {
  ...EmptyStateView.propTypes,
  onRetry: React.PropTypes.func,
  message: React.PropTypes.string,
};

const StyledView = connectStyle('shoutem.ui.EmptyStateView', {})(EmptyStateView);

export {
  StyledView as EmptyStateView,
};
