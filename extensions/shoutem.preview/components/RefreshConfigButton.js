import { fetchConfiguration } from '../actions';
import { getAppId } from 'shoutem.application';
import { connect } from 'react-redux';
import React from 'react';
import { Spinner } from '@shoutem/ui';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const CIRCLE_RADIUS = 36;
const Window = Dimensions.get('window');
const styles = StyleSheet.create({
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  draggableContainer: {
    position: 'absolute',
    bottom: CIRCLE_RADIUS * 2,
    right: 15,
  },
  circle: {
    backgroundColor: '#00aadf',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

class RefreshConfigButton extends React.Component {
  static propTypes = {
    fetchConfiguration: React.PropTypes.func,
    appState: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.pressed = this.pressed.bind(this);

    this.state = {
      pan: new Animated.ValueXY(),
      loading: false,
    };
    let timePressed;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        timePressed = new Date().getTime();
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
      onPanResponderRelease: () => {
        const now = new Date().getTime();
        if (now - 100 <= timePressed) {
          this.pressed();
        }
      },
    });
  }

  pressed() {
    this.setState({ loading: true });
    this.props.fetchConfiguration(getAppId(this.props.appState)).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}
        >
          {!this.state.loading ? <Text style={styles.text}>Refresh!</Text> : <Spinner />}
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(appState) {
  return { appState };
}

const ConnectedButton = connect(mapStateToProps, { fetchConfiguration })(RefreshConfigButton);
export {
  ConnectedButton as RefreshConfigButton,
};
