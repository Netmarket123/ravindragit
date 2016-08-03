import React, { Component } from 'react';
import { View } from 'react-native';
import { ZoomOut } from './ZoomOut';
import { Parallax } from './Parallax';
/*
 * HeroHeader adds complex effect to its children components.
 * Connect it to driver to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *    <Screen styleName="full-screen">
 *      <HeroHeader driver={driver}>
 *          <Image />
 *      </HeroHeader>
 *      <ScrollView
 *        {...driver.scrollViewProps}
 *      >
 *        <Title>Title</Title>
 *      </ScrollView>
 *    </Screen>
 * );
 *
 * ...
 * Above code will create scroll dependent parallax animation over Image component
 * where image will be scrolled 1.5 times faster then Title but it will have Zoom effect
 * on scroll bounce
 */
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
