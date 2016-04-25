import React, {
  PropTypes,
  ScrollView,
  ViewPagerAndroid,
  Dimensions,
  Platform,
  Children,
  View,
} from 'react-native';

const propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
};

const screenWidth = Dimensions.get('window').width;

const styles = {
  item: {
    flex: 1,
    width: screenWidth,
  },
};

/**
 * Renders a horizontal pager which wraps its child components
 * as pages.
 *
 * It can be used as a general wrapper component for any group
 * of uniform components which require horizontal paging.
 * It abstracts away React Native API inconsistencies between
 * iOS and Android platforms and should be used instead of
 * ScrollView and ViewPagerAndroid for this matter.
 *
 * @returns {*}
 */
export default function HorizontalPager({
  height,
  children,
}) {
  // wrap children in a View component of a fixed width
  const childrenWrappedInPages = Children.map(children, child => (
    <View style={styles.item}>{child}</View>
  ));

  if (Platform.OS === 'android') {
    return (
      <ViewPagerAndroid
        style={{ height }}
        initialPage={0}
      >
        {childrenWrappedInPages}
      </ViewPagerAndroid>
    );
  }

  return (
    <ScrollView
      pagingEnabled
      horizontal
    >
      {childrenWrappedInPages}
    </ScrollView>
  );
}

HorizontalPager.propTypes = propTypes;
