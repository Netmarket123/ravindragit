import React, {
  View,
  Component,
  StyleSheet,
} from 'react-native';

import NativeVideo from './NativeVideo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Video extends Component {
  render() {
    const { width, height } = this.props;

    return (
      <View style={[styles.container, { width, height }]}>
        <NativeVideo
          source={this.props.source}
          width={this.props.width}
          height={this.props.height}
        />
      </View>
    );
  }
}

export default Video;
