import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';

import {
  Icon,
  Button,
} from '@shoutem/ui';

import Video from 'react-native-video';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
  style: PropTypes.object,
};

class NativeVideo extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onError = this.onError.bind(this);
    this.getCurrentTimePercentage = this.getCurrentTimePercentage.bind(this);
    this.onPressCloseBUtton = this.onPressCloseBUtton.bind(this);
    this.onPressVideo = this.onPressVideo.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    fullScreen: false,
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onError(error) {
    console.warn(`Video cannot be loaded ${error}`);
  }

  onPressCloseBUtton() {
    this.setState({
      paused: true,
      fullScreen: !this.state.fullScreen,
    });
  }

  onPressVideo() {
    this.setState({
      paused: !this.state.paused,
      fullScreen: true,
    });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }

    return 0;
  }


  render() {
    const { width, height, style } = this.props;

    const playableVideo = (
      <TouchableOpacity style={style.fullScreen} onPress={this.onPressVideo}>
        <Video
          source={this.props.source}
          style={this.state.fullScreen ? style.fullScreen : { width, height }}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.onLoad}
          onError={this.onError}
          onProgress={this.onProgress}
          repeat
        />
      </TouchableOpacity>
    );

    if (this.state.fullScreen) {
      const flexCompleted = this.getCurrentTimePercentage() * 100;
      const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

      const closeButton = (
        <View style={style.header}>
          <TouchableOpacity style={style.fullScreen} onPress={this.onPressCloseBUtton}>
            <Text style={style.closeButton}>×</Text>
          </TouchableOpacity>
        </View>
      );

      const controls = (
        <View style={style.controls}>
          <View style={style.trackingControls}>
            <View style={style.progress}>
              <View style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View>
       );

      return (
        <Modal>
          <View style={style.container}>
            {playableVideo}
            {controls}
            {closeButton}
          </View>
        </Modal>
      );
    }

    const playButton = (
      <View
        pointerEvents="none"
        style={[style.playButton, { width, height }]}
      >
        <Button name="play" styleName="rounded">
          <Icon styleName="squared" name="play" />
        </Button>
      </View>
    );

    return (
      <View>
        {playableVideo}
        {playButton}
      </View>
    );
  }
}

NativeVideo.propTypes = propTypes;

export { NativeVideo };
