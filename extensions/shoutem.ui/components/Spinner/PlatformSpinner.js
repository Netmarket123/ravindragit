import React, {
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Platform,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';

function PlatformSpinner({ style }) {
  if (Platform.OS === 'android') {
    return (
      <ProgressBarAndroid
        style={style.android}
        styleAttr="Inverse"
      />
    );
  }

  return (
    <ActivityIndicatorIOS
      animating
      size="small"
      style={style.ios}
    />
  );
}

PlatformSpinner.propTypes = {
  style: React.PropTypes.object,
};

const style = {
  android: {
    height: 20,
  },
  ios: {
  },
};

export default connectStyle('shoutem.ui.FullScreenSpinner', style)(PlatformSpinner);
