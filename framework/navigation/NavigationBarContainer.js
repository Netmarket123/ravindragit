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
    this.setState(newState);
  }

  render() {
    const NavigationBar = this.props.navigationBarComponent;
    // navigationBar could take advantage over this to show back button
    const hasHistory = this.props.manager.routeStates.size > 1;
    // send only props that are set by new screen
    const navBarProps = _.pick(this.state, Object.keys(this.newState));
    return (
      <NavigationBar hasHistory={hasHistory} {...navBarProps} />
    );
  }
}

NavigationBarContainer.propTypes = {
  manager: React.PropTypes.object.isRequired,
  navigationBarComponent: React.PropTypes.func,
};
