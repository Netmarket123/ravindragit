import React from 'react';
import { Animated, LayoutAnimation, Dimensions } from 'react-native';
import _ from 'lodash';
import { ListItem } from 'shoutem.ui';
import moment from 'moment';


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
    };
  }

  onPress() {
    LayoutAnimation.spring();
    this.setState({
      style: {
        itemImage: {
          height: DEFAULT_HEADER_HEIGHT,
          width: Dimensions.get('window').width,
          top: 0,
          left: 0,
          transform: [
            {
              translateX: -20,
            },
            {
              translateY: -200,
            },
          ],
        },
      },
    });
    _.delay(() => this.props.onPress(this.props.article), 500);
  }

  render() {
    const {
      article,
      style,
    } = this.props;

    const AnimatatedListItem = Animated.createAnimatedComponent(ListItem);

    return (
      <AnimatatedListItem
        ref="listItem"
        key={article.id}
        description={article.title}
        image={{ uri: _.get(article, 'image.url') }}
        leftExtra={moment(article.timeUpdated).fromNow()}
        id={article.id}
        numberOfLines={3}
        style={[style, this.state.style]}
        onPress={this.onPress}
        fallbackImage={require('../assets/images/image-fallback.png')}
      />
    );
  }
}
