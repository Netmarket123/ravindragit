import React, {
  View,
  ScrollView,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import { INCLUDE, connectStyle } from 'shoutem/theme';
import { RichMedia, ShoutemIconButton, GridBox, InfoFields } from 'shoutem.ui';
import * as _ from 'lodash';
import moment from 'moment';
import Share from 'react-native-share';
import NextArticle from '../components/NextArticle';

const windowHeight = Dimensions.get('window').height;
// TODO(Braco) - make it configurable trough props
const HEADER_HEIGHT_COEFFICIENT = 0.65;
const DEFAULT_HEADER_HEIGHT = windowHeight * HEADER_HEIGHT_COEFFICIENT;
const DEFAULT_BOTTOM_CONTENT_OFFSET = windowHeight - DEFAULT_HEADER_HEIGHT;
const NAV_BAR_INTERPOLATION_INPUT = [windowHeight * 0.40, windowHeight * 0.60 - 40];

function getOffsetHeight(offset) {
  return windowHeight - offset;
}

function createDetailsStyle(topOffset, style) {
  return {
    detailsContainer: {
      ...style.detailsContainer,
      marginTop: topOffset,
    },
    detailsTitle: style.detailsTitle,
    detailsTitleContainer: style.detailsTitleContainer,
    detailsText: style.detailsText,
  };
}

function interpolateIconColor(scrollY, detailsTopOffset, navBarTextColor) {
  return scrollY.interpolate({
    inputRange: NAV_BAR_INTERPOLATION_INPUT,
    outputRange: ['rgba(255,255,255,1)', navBarTextColor],
    extrapolate: 'clamp',
  });
}

function createAnimatedHeaderStyle(headerStyle, animatedValue, headerHeight) {
  return [headerStyle, {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [0, -headerHeight / 3],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-headerHeight, 0, headerHeight],
          outputRange: [1.75, 1, 1],
        }),
      },
    ],
  }];
}

function createAnimatedHeaderTextStyle(headerStyle, animatedValue, headerHeight) {
  return [headerStyle, {
    opacity: animatedValue.interpolate({
      inputRange: [windowHeight * 0.15, windowHeight * 0.55],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, headerHeight],
          outputRange: [0, -headerHeight / 4],
        }),
      },
    ],
  }];
}

function createAnimatedHeaderOverlay(animatedValue) {
  return {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    flex: 1,
    backgroundColor: animatedValue.interpolate({
      inputRange: NAV_BAR_INTERPOLATION_INPUT,
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)'],
      extrapolate: 'clamp',
    }),
  };
}

function createNavigationBarStyle(scrollY, detailsTopOffset, navBarTextColor) {
  return {
    container: {
      backgroundColor: scrollY.interpolate({
        inputRange: NAV_BAR_INTERPOLATION_INPUT,
        outputRange: ['rgba(0,0,0,0)', 'rgba(255,255,255,1)'],
        extrapolate: 'clamp',
      }),
      borderWidth: 0,
      borderBottomColor: scrollY.interpolate({
        inputRange: NAV_BAR_INTERPOLATION_INPUT,
        outputRange: ['rgba(0,0,0,0)', 'rgba(51, 51, 51, 0.2)'],
        extrapolate: 'clamp',
      }),
      borderBottomWidth: 1,
    },
    defaultBackButton: {
      buttonIcon: {
        color: interpolateIconColor(scrollY, detailsTopOffset, navBarTextColor),
      },
    },
  };
}

function createScreenTitle(titleStyle, title, scrollY) {
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        titleStyle,
        {
          color: scrollY.interpolate({
            inputRange: NAV_BAR_INTERPOLATION_INPUT,
            outputRange: ['rgba(255, 255, 255, 0)', titleStyle.color],
            extrapolate: 'clamp',
          }),
        },
      ]}
    >
      {title.toUpperCase()}
    </Animated.Text>
  );
}

function createShareButtonStyle(shareButtonStyle, scrollY, detailsTopOffset) {
  const iconColor = interpolateIconColor(scrollY, detailsTopOffset, shareButtonStyle.color);
  return _.set(Object.assign({}, shareButtonStyle), ['buttonIcon', 'color'], iconColor);
}

function getScrollHandle(scrollY) {
  return Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
  );
}

class ArticleDetailsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {
      bottomContentOffset: bottomContentOffsetProp,
      style,
    } = this.props;
    this.onShare = this.onShare.bind(this);
    const bottomContentOffset = bottomContentOffsetProp || DEFAULT_BOTTOM_CONTENT_OFFSET;
    const detailsTopOffset = getOffsetHeight(bottomContentOffset);
    this.state = {
      scrollY: new Animated.Value(0),
      bottomContentOffset,
      detailsTopOffset,
      detailsStyle: createDetailsStyle(detailsTopOffset, style),
    };
  }

  onShare() {
    const article = this.props.article;
    Share.open({
      title: article.title,
      share_text: article.summary,
      share_URL: article.link,
    }, (sharingError) => {
      console.error(sharingError);
    });
  }

  shouldRenderNextArticle() {
    return this.props.articles && this.props.showNext;
  }

  renderUpNext() {
    const { article: currentArticle, articles, style } = this.props;
    const currentArticleIndex = articles.indexOf(currentArticle);

    const nextArticle = articles[currentArticleIndex + 1];
    if (nextArticle) {
      return (
        <NextArticle
          style={style.upNext}
          article={nextArticle}
          articles={articles}
        />
      );
    }
    return null;
  }

  renderNavBar() {
    const { article, style } = this.props;
    const {
      detailsTopOffset,
      scrollY,
    } = this.state;
    const title = article.title || '';
    const navBarTextColor = style.navBarTitle.color;
    const navigationBarStyle = createNavigationBarStyle(scrollY, detailsTopOffset, navBarTextColor);
    const screenTitle = createScreenTitle(style.navBarTitle, title, scrollY);
    const shareButtonStyle = createShareButtonStyle(style.shareButton, scrollY, detailsTopOffset);
    const shareButton = (
      <ShoutemIconButton
        iconName="share"
        onPress={this.onShare}
        style={shareButtonStyle}
      />
    );

    this.props.setNavBarProps({
      rightComponent: shareButton,
      style: navigationBarStyle,
      centerComponent: screenTitle,
    });
  }

  render() {
    const {
      article,
      style,
    } = this.props;
    const {
      detailsStyle,
      detailsTopOffset,
      scrollY,
    } = this.state;
    const headerStyle = createAnimatedHeaderStyle(style.header, scrollY, detailsTopOffset);
    const headerOverlayStyle = createAnimatedHeaderOverlay(scrollY);
    const headerTextStyleWrapper =
      createAnimatedHeaderTextStyle(style.header, scrollY, detailsTopOffset);
    this.renderNavBar();

    return (
      <View style={style.screen}>
        <Animated.Image
          style={headerStyle}
          source={{ uri: _.get(article, 'image.url') }}
        >
          <Animated.View style={headerOverlayStyle} >
            <View style={style.scrollIndicator} />
          </Animated.View>
        </Animated.Image>
        <Animated.View style={headerTextStyleWrapper}>
          <GridBox style={style.headline.gridBox}>
            <Text style={style.headline.title}>{article.title.toUpperCase()}</Text>
            <InfoFields
              fields={[article.news_author, moment(article.timeUpdated).fromNow()]}
              style={style.headline.infoFields}
            />
          </GridBox>
        </Animated.View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={style.container}
          scrollEventThrottle={1}
          onScroll={getScrollHandle(scrollY)}
        >
          <View key="details" style={detailsStyle.detailsContainer}>
            <RichMedia
              body={article.body}
              attachments={article.attachments}
            />
          </View>
          {this.shouldRenderNextArticle() && this.renderUpNext()}
        </ScrollView>
      </View>
    );
  }

}

ArticleDetailsScreen.propTypes = {
  article: React.PropTypes.object,
  articles: React.PropTypes.array,
  style: React.PropTypes.object,
  bottomContentOffset: React.PropTypes.number,
  setNavBarProps: React.PropTypes.func,
  showNext: React.PropTypes.bool,
};

const style = {
  headline: {
    [INCLUDE]: ['shoutem.ui.NewsGridBox.photoCentric'],
    gridBox: {
      contentWrapper: {
        padding: 40,
      },
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      lineHeight: 25,
      backgroundColor: 'transparent',
      [INCLUDE]: ['h1'],
    },
    infoFields: {
      info: {
        marginBottom: 30,
        marginTop: 15,
      },
      fieldText: {
        fontSize: 13,
        color: '#fff',
        backgroundColor: 'transparent',
      },
    },
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: DEFAULT_HEADER_HEIGHT,
    width: null,
    flex: 0,
  },
  navBarTitle: {
    [INCLUDE]: ['baseFont', 'navigationBarTextColor'],
    width: 200,
    fontSize: 15,
  },
  scrollIndicator: {
    borderColor: 'transparent',
    borderLeftColor: 'white',
    borderBottomColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 16,
    height: 16,
    marginBottom: 30,
    alignSelf: 'center',
    transform: [{
      rotate: '-45deg',
    }],
  },
  screen: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  detailsText: {},
  detailsTitle: {
    [INCLUDE]: ['h1'],
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  detailsTitleContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  shareButton: {
    [INCLUDE]: ['navigationBarTextColor'],
    buttonContainer: {
    },
    button: {
      width: 40,
      height: 30,
      paddingLeft: 16,
      paddingBottom: 10,
      paddingRight: 4,
      flexDirection: 'row',
      justifyContent: 'flex-end',

    },
    buttonIcon: {
      [INCLUDE]: ['navigationBarTextColor'],
      fontSize: 24,
    },
  },
  upNext: {
    gridBox: {
      container: {
        height: 130,
      },
      contentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 15,
        flex: 1,
        flexDirection: 'column',
      },
    },
    label: {
      marginBottom: 40,
      [INCLUDE]: ['baseFont'],
      fontSize: 15,
      fontWeight: '500',
      color: '#fff',
    },
    articleTitle: {
      [INCLUDE]: ['baseFont'],
      fontWeight: '500',
      color: '#fff',
      fontSize: 16,
      width: 250,
    },
  },
};

export default connectStyle('shoutem.news.DetailsScreen', style)(ArticleDetailsScreen);
