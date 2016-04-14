import React, {
  View,
  ScrollView,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import { INCLUDE, connectStyle } from 'shoutem/theme';
import * as _ from 'lodash';

const DEFAULT_BOTTOM_CONTENT_OFFSET = 50;

function createOffsetStyle(offset) {
  return Dimensions.get('window').height - offset;
}

function createDetailsStyle(topOffset) {
  return {
    marginTop: topOffset,
  };
}

function createAnimatedHeaderStyle(headerStyle, animatedValue, headerHeight) {
  return _.merge({}, headerStyle, {
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

function getScrollHandle(scrollY) {
  return Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
  );
}

function Details({ item, style }) {
  return (
    <View key="details" style={style}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{item.title}</Text>
      </View>
      <Text>{item.body.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
    </View>
  );
}

Details.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
};

function GannettDetailsScreen({
  item,
  style,
  bottomContentOffset: bottomContentOffsetProp,
}) {
  const bottomContentOffset = bottomContentOffsetProp || DEFAULT_BOTTOM_CONTENT_OFFSET;
  const scrollY = new Animated.Value(0);
  const detailsTopOffset = createOffsetStyle(bottomContentOffset);
  const headerStyle = createAnimatedHeaderStyle(style.header, scrollY, detailsTopOffset);
  const detailsStyle = createDetailsStyle(detailsTopOffset);

  return (
    <View style={style.screen}>
      <Animated.Image
        source={{ uri: item.image_url }}
        style={headerStyle}
      />
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={style.container}
        scrollEventThrottle={16}
        onScroll={getScrollHandle(scrollY)}
      >
        <Details item={item} style={[style.details, detailsStyle]} />
      </ScrollView>
    </View>
  );
}

GannettDetailsScreen.propTypes = {
  item: React.PropTypes.object,
  style: React.PropTypes.object,
  bottomContentOffset: React.PropTypes.number,
};

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
