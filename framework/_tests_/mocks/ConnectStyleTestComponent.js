import React, {
  Component,
  Text,
} from 'react-native';

import { connectStyle } from '../../theme';

class ConnectStyleTestComponent extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  };
  render() {
    return <Text>Testing StyleProvider</Text>;
  }
}

const style = {
  testStyle: {},
};

export default connectStyle('TestComponent', style)(ConnectStyleTestComponent);
