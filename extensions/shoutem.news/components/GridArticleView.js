import React from 'react';
import { Animated, Dimensions, Modal, View, } from 'react-native';
import _ from 'lodash';
import { ListItem } from 'shoutem.ui';
import moment from 'moment';

import NativeMethodsMixin from 'react-native/Libraries/ReactIOS/NativeMethodsMixin';

const windowHeight = Dimensions.get('window').height;
const HEADER_HEIGHT_COEFFICIENT = 0.65;
const DEFAULT_HEADER_HEIGHT = windowHeight * HEADER_HEIGHT_COEFFICIENT;
/**
 * Component used to render single grid article item
 */
export default class GridArticleView extends React.Component {
  static propTypes = {
    // Custom GridArticleView style
    style: React.PropTypes.object,
    // onPress callback function, activated on View press
    onPress: React.PropTypes.func,
    // Item used to bind data
    article: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      style: {},
      collapsed: false,
      initialXYPosition: new Animated.ValueXY(0, 0),
    };
  }

  onPress() {
    this.setState({
      collapsed: true,
    });
    const animation = this.state.initialXYPosition;
    Animated.timing(
      animation,
      {
        toValue: { x: 0, y: 0 },
        duration: 500,
      }
    ).start();
    _.delay(() => {
      this.props.onPress(this.props.article);
      this.setState({ collapsed: false, });
    }, 500);
  }

  componentDidMount() {
    const self = this;

    requestAnimationFrame(() => {
      NativeMethodsMixin.measure.call(self._cell, (x, y, width, height, pageX, pageY) => {
        self.state.initialXYPosition.setValue({ x: pageX, y: pageY });
      });
    });
  }

  render() {
    const {
      article,
      style,
    } = this.props;

    const AnimatatedListItem = Animated.createAnimatedComponent(ListItem);

    const animatedStyle = this.state.initialXYPosition.getLayout();

    return (
      <View>
        <Modal
          visible={this.state.collapsed}
          transparent
        >
          <AnimatatedListItem
            key={article.id}
            description={article.title}
            image={{ uri: _.get(article, 'image.url') }}
            leftExtra={moment(article.timeUpdated).fromNow()}
            id={article.id}
            numberOfLines={3}
            style={[style, {
              itemImage: {
                ...animatedStyle,
              },
              container: {
                ...animatedStyle,
                height: 180,
                width: 100,
                backgroundColor: 'transparent',
              },
            }]}
            onPress={this.onPress}
            fallbackImage={require('../assets/images/image-fallback.png')}
          />
        </Modal>
        <AnimatatedListItem
          ref={(component) => { this._cell = component; }}
          key={article.id}
          description={article.title}
          image={{ uri: _.get(article, 'image.url') }}
          leftExtra={moment(article.timeUpdated).fromNow()}
          id={article.id}
          numberOfLines={3}
          style={style}
          onPress={this.onPress}
          fallbackImage={require('../assets/images/image-fallback.png')}
        />
      </View>
    );
  }
}
