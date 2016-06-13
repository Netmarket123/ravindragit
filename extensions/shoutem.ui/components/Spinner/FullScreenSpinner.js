import React, {
  View,
  Modal,
} from 'react-native';
import PlatformSpinner from './PlatformSpinner';
import { connectStyle, INCLUDE } from '@shoutem/theme';

function FullScreenSpinner({ style }) {
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
