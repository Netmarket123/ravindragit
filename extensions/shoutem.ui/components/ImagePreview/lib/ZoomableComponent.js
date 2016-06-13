import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  PanResponder,
  LayoutAnimation,
} from 'react-native';

function getDistanceBetweenTwoPoints({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function middle1D(p1, p2) {
  return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
}

function middle2D({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return {
    x: middle1D(x1, x2),
    y: middle1D(y1, y2),
  };
}

function maxOffset(offset, windowDimension, imageDimension) {
  const max = windowDimension - imageDimension;
  if (max >= 0) {
    return 0;
  }

  return offset < max ? max : offset;
}

function getOffsetByZoom({ width, height, zoom }, { componentWidth, componentHeight }) {
  const xDiff = componentWidth * zoom - width;
  const yDiff = componentHeight * zoom - height;

  return {
    left: -xDiff / 2,
    top: -yDiff / 2,
  };
}

/**
 * makeZoomable
 *
 * makes the provided component zoomable.
 *
 * @param ComponentToBeDecorated
 * @returns zoomable component
 */
export default function makeZoomable(ComponentToBeDecorated) {
  /**
   * ZoomDecorator renders the ComponentToBeDecorated within a view with PanResponder.
   * It creates the zoom and move effect by detecting pinch and move gestures performed
   * within the view and updates the style of the decorated component with new values
   * for width, height and absolute position.
   */
  class ZoomDecorator extends Component {
    constructor(props) {
      super(props);
      this._onLayout = this._onLayout.bind(this);
      this.state = {
        zoom: null,
        minZoom: null,
        layoutKnown: false,
        isZooming: false,
        isMoving: false,
        initialDistance: null,
        initialX: null,
        initalY: null,
        offsetTop: 0,
        offsetLeft: 0,
        initialTop: 0,
        initialLeft: 0,
        initialTopWithoutZoom: 0,
        initialLeftWithoutZoom: 0,
        initialZoom: 1,
        top: 0,
        left: 0,
      };
    }

    componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => {},
        onPanResponderMove: (evt) => {
          const touches = evt.nativeEvent.touches;
          const touch1 = touches[0];
          const touch2 = touches[1];

          if (touches.length === 2) {
            this.processPinch(touch1, touch2);
          } else if (touches.length === 1 && !this.state.isZooming) {
            this.processTouch(touch1.pageX, touch1.pageY);
          }
        },

        onPanResponderTerminationRequest: () => true,
        onPanResponderRelease: () => {
          this.setState({
            isZooming: false,
            isMoving: false,
          });
        },
        onPanResponderTerminate: () => {},
        onShouldBlockNativeResponder: () => true,
      });
    }

    processPinch(touch1, touch2) {
      const point1 = {
        x: touch1.pageX,
        y: touch1.pageY,
      };

      const point2 = {
        x: touch2.pageX,
        y: touch2.pageY,
      };

      const distance = getDistanceBetweenTwoPoints(point1, point2);
      const center = middle2D(point1, point2);

      if (!this.state.isZooming) {
        const offsetByZoom = getOffsetByZoom(this.state, this.props);
        this.setState({
          isZooming: true,
          initialDistance: distance,
          initialX: center.x,
          initialY: center.y,
          initialTop: this.state.top,
          initialLeft: this.state.left,
          initialZoom: this.state.zoom,
          initialTopWithoutZoom: this.state.top - offsetByZoom.top,
          initialLeftWithoutZoom: this.state.left - offsetByZoom.left,
        });
      } else {
        const touchZoom = distance / this.state.initialDistance;
        const zoom = touchZoom * this.state.initialZoom > this.state.minZoom
          ? touchZoom * this.state.initialZoom : this.state.minZoom;

        const offsetByZoom = getOffsetByZoom(this.state, this.props);
        const left = (this.state.initialLeftWithoutZoom * touchZoom) + offsetByZoom.left;
        const top = (this.state.initialTopWithoutZoom * touchZoom) + offsetByZoom.top;

        this.setState({
          zoom,
          left: left > 0 ? 0 : maxOffset(left, this.state.width, this.props.componentWidth * zoom),
          top: top > 0 ? 0 : maxOffset(top, this.state.height, this.props.componentHeight * zoom),
        });
        LayoutAnimation.easeInEaseOut();
      }
    }

    processTouch(x, y) {
      if (!this.state.isMoving) {
        this.setState({
          isMoving: true,
          initialX: x,
          initialY: y,
          initialTop: this.state.top,
          initialLeft: this.state.left,
        });
      } else {
        const left = this.state.initialLeft + x - this.state.initialX;
        const top = this.state.initialTop + y - this.state.initialY;

        const zoomedWidth = this.props.componentWidth * this.state.zoom;
        const zoomedHeight = this.props.componentHeight * this.state.zoom;

        this.setState({
          left: left > 0 ? 0 : maxOffset(left, this.state.width, zoomedWidth),
          top: top > 0 ? 0 : maxOffset(top, this.state.height, zoomedHeight),
        });
        LayoutAnimation.easeInEaseOut();
      }
    }

    _onLayout(event) {
      const layout = event.nativeEvent.layout;

      if (layout.width === this.state.width && layout.height === this.state.height) {
        return;
      }

      const zoom = layout.width / this.props.componentWidth;

      const offsetTop = layout.height > this.props.componentHeight * zoom
        ? (layout.height - this.props.componentHeight * zoom) / 2
        : 0;

      this.setState({
        layoutKnown: true,
        width: layout.width,
        height: layout.height,
        zoom,
        offsetTop,
        minZoom: zoom,
      });
    }

    render() {
      const { style, ...otherProps } = this.props;
      return (
        <View
          style={style}
          {...this._panResponder.panHandlers}
          onLayout={this._onLayout}
        >
          <ComponentToBeDecorated
            style={[style, {
              position: 'absolute',
              top: this.state.offsetTop + this.state.top,
              left: this.state.offsetLeft + this.state.left,
              width: this.props.componentWidth * this.state.zoom,
              height: this.props.componentHeight * this.state.zoom,
            }]}
            {...otherProps}
          />
        </View>
      );
    }
  }

  ZoomDecorator.propTypes = {
    componentWidth: PropTypes.number.isRequired,
    componentHeight: PropTypes.number.isRequired,
    style: PropTypes.object,
  };

  return ZoomDecorator;
}

