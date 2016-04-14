import React, {
  Component,
  Text,
} from 'react-native';

import { connectStyle } from '../../theme';

class ConnectStyleTestClassComponent extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
    this.state = { text: 'Testing StyleProvider' };
  }
  render() {
    return <Text>{this.state.text}</Text>;
  }
}

function ConnectStyleTestStatelessComponent() {
  return <Text>Stateless Component</Text>;
}

const style = {
  testStyle: {},
};

const ConnectedClassComponent =
  connectStyle('TestComponent', style)(ConnectStyleTestClassComponent);
const ConnectedStatelessComponent =
  connectStyle('TestComponent', style)(ConnectStyleTestStatelessComponent);

export {
  ConnectedClassComponent,
  ConnectedStatelessComponent,
};
