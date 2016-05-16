import React, {
  View,
  Modal,
} from 'react-native';
import PlatformSpinner from './PlatformSpinner';
import { connectStyle, INCLUDE } from 'shoutem/theme';

let mountedInstance;

class FullScreenSpinner extends React.Component {
  componentWillMount() {
    if (!mountedInstance) {
      mountedInstance = this;
    }
  }

  componentWillUnmount() {
    mountedInstance = null;
  }

  render() {
    const { style } = this.props;
    if (mountedInstance !== this) {
      // Allowing only one FullScreenSpinner instance per app
      console.warn('Rendering multiple FullScreenSpinner component.');
      return null;
    }
    return (
      <Modal visible transparent>
        <View style={style.container}>
          <View style={style.spinnerFrame}>
            <PlatformSpinner />
          </View>
        </View>
      </Modal>
    );
  }
}


FullScreenSpinner.propTypes = {
  style: React.PropTypes.object,
};

const style = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    [INCLUDE]: ['centerContent'],
  },
  spinnerFrame: {
    [INCLUDE]: ['centerContent'],
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
};

export default connectStyle('shoutem.ui.FullScreenSpinner', style)(FullScreenSpinner);
