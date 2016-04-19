import React, {
  StyleSheet,
  Component,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    height: 700,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  embedded: {
    flex: 1
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  exit: {
    borderRadius: 10,
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 20,
    left: 300,
    width: 50,
    height: 50,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
});

class NativeVideo extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onError = this.onError.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.getCurrentTimePercentage = this.getCurrentTimePercentage.bind(this);
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

  onLoadStart(data) {
    console.warn(JSON.stringify(this.props));
    //console.warn(`Video is loading ${JSON.stringify(data)}`);
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
    //console.warn(`Video is loaded ${JSON.stringify(data)}`);
    this.setState({ paused: !this.state.paused });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onError(error) {
    console.warn(`Video cannot be loaded ${error}`);
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }

    return 0;
  }

  getWrapperComponent() {
    return this.state.fullScreen ? Modal : View;
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const { width, height } = this.props;

    const WrapperComponent = this.getWrapperComponent();

    let closeButton;
    let controls;

    if (this.state.fullScreen) {
      closeButton = <View style={styles.exit}>
          <TouchableOpacity style={styles.fullScreen} onPress={() => {
            this.setState({
              paused: true,
              fullScreen: !this.state.fullScreen,
            });
          }}
      >
          </TouchableOpacity>
        </View>;

      controls = <View style={styles.controls}>
          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View>;
    }

    return (
      <WrapperComponent >
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {
          this.setState({
            paused: !this.state.paused,
            fullScreen: true,
          });
        }}
        >
          <Video
            source={this.props.source}
            style={ this.state.fullScreen ? styles.fullScreen : { width, height } }
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onError={this.onError}
            onProgress={this.onProgress}
            repeat
          />
        </TouchableOpacity>
        {controls}
        {closeButton}
      </View>
      </WrapperComponent>
    );
  }
}

export default NativeVideo;
