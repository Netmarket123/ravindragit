import React, { Component } from 'react';
import { View } from 'react-native';
import { ZoomOut } from './ZoomOut';
import { Parallax } from './Parallax';

export class HeroHeader extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      height: 240,
    };
  }
  onLayout(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({ height });
  }

  render() {
    const { driver, children } = this.props;

    return (
      <View onLayout={this.onLayout}>
        <ZoomOut
          driver={driver}
          inputRange={[-(this.state.height), 0]}
          maxFactor={2.5}
        >
          <Parallax
            driver={driver}
            scrollSpeed={1.5}
            insideScroll={false}
            extrapolation={{ extrapolateLeft: 'clamp' }}
          >
            {children}
          </Parallax>
        </ZoomOut>
      </View>
    );
  }
}

HeroHeader.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
};
