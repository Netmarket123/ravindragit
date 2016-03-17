import React, {
  Component,
  Text,
} from 'react-native';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    //console.log('Navigation bar constructor');
    this.onStateChange = this.onStateChange.bind(this);

    this.state = {
      title: '',
    };
    props.manager.setStateChangeListener(this.onStateChange);
  }

  onStateChange(oldState, newState) {
    console.log(`onStateChange: ${JSON.stringify(newState)}`);
    this.setState(newState);
  }

  render() {
    //console.log('Navigation bar render');
    return (
      <Text>{this.state.title}</Text>
    );
  }
}

NavigationBar.propTypes = {
  manager: React.PropTypes.object.isRequired,
  title: React.PropTypes.string,
};
