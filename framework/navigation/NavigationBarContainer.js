import React, {
  Component,
} from 'react-native';

import * as _ from 'lodash';

export default class NavigationBarContainer extends Component {
  constructor(props) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);

    props.manager.setStateChangeListener(this.onStateChange);
    this.newState = {};
  }

  onStateChange(oldState, newState) {
    this.newState = newState;
    this.setState(_.assign({}, newState));
  }

  render() {
    const { manager, navigateBack } = this.props;
    // navigationBar could take advantage of this to show back button
    const hasHistory = manager.routeStates.size > 1;
    return (
      this.props.renderNavigationBar({ ...this.newState, hasHistory, navigateBack })
    );
  }
}

NavigationBarContainer.propTypes = {
  manager: React.PropTypes.shape({
    setStateChangeListener: React.PropTypes.func.isRequired,
  }).isRequired,
  renderNavigationBar: React.PropTypes.func,
  navigateBack: React.PropTypes.func,
};
