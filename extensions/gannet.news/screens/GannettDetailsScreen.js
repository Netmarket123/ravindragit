import React, {
  View,
  ScrollView,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import { INCLUDE, connectStyle } from 'shoutem/theme';
import * as _ from 'lodash';

const CALCULATE_TOP_OFFSET = Symbol('createOffsetStyle');
const CREATE_DETAILS_STYLE = Symbol('createDetailsStyle');
const CREATE_HEADER_STYLE = Symbol('createHeaderStyle');
const GET_SCROLL_HANDLE = Symbol('getScrollHandle');
const RENDER_DETAILS = Symbol('renderDetails');
const CREATE_STATE = Symbol('createState');
const DEFAULT_BOTTOM_CONTENT_OFFSET = 50;

class GannettDetailsScreen extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    style: React.PropTypes.object,
    bottomContentOffset: React.PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    const bottomContentOffset = props.bottomContentOffset || DEFAULT_BOTTOM_CONTENT_OFFSET;

    this.state = this[CREATE_STATE](bottomContentOffset);

    this[GET_SCROLL_HANDLE] = this[GET_SCROLL_HANDLE].bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bottomContentOffset !== this.props.bottomContentOffset) {
      this.setState(this[CREATE_STATE](nextProps.bottomContentOffset));
    }
    return true;
  }

  [CREATE_STATE](bottomContentOffset) {
    const scrollY = new Animated.Value(0);
    const detailsTopOffset = this[CALCULATE_TOP_OFFSET](bottomContentOffset);

    return {
      detailsTopOffset,
      scrollY,
      headerStyle: this[CREATE_HEADER_STYLE](scrollY, detailsTopOffset),
      detailsStyle: this[CREATE_DETAILS_STYLE](detailsTopOffset),
    };
  }

  [CALCULATE_TOP_OFFSET](offset) {
    return Dimensions.get('window').height - offset;
  }

  [CREATE_DETAILS_STYLE](topOffset) {
    return {
      marginTop: topOffset,
    };
  }

  [CREATE_HEADER_STYLE](animatedValue, headerHeight) {
    return _.merge({}, this.props.style.header, {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [-headerHeight, 0, headerHeight],
            outputRange: [headerHeight / 2, 0, -headerHeight / 3],
          }),
        },
      ],
    });
  }

  [GET_SCROLL_HANDLE]() {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );
  }

  [RENDER_DETAILS](item) {
    const style = this.props.style;

    return (
      <View key="details" style={[style.details, this.state.detailsStyle]}>
        <View style={style.titleContainer}>
          <Text style={style.title}>{item.title}</Text>
        </View>
        <Text>{item.body.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
      </View>
    );
  }

  render() {
    const { style, item } = this.props;

    return (
      <View style={style.screen}>
        <Animated.Image
          source={{ uri: item.image_url }}
          style={this.state.headerStyle}
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={style.container}
          scrollEventThrottle={16}
          onScroll={this[GET_SCROLL_HANDLE]()}
        >
          {this[RENDER_DETAILS](item)}
        </ScrollView>
      </View>
    );
  }
}

const style = {
  screen: {
    position: 'relative',
  },
  title: {
    [INCLUDE]: ['h1'],
    color: 'black',
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  details: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: null,
    width: null,
  },
};

export default connectStyle('dev.ext.GannettDetailsScreen', style)(GannettDetailsScreen);
