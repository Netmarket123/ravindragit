import React, {
  View,
  ScrollView,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import { INCLUDE, connectStyle } from '@shoutem/theme';
import { NewsGridBox, RichMedia, ShoutemIconButton } from 'shoutem.ui';
import * as _ from 'lodash';
import moment from 'moment';
import Share from 'react-native-share';
import NextArticle from '../components/NextArticle';

const DEFAULT_BOTTOM_CONTENT_OFFSET = 50;

function getOffsetHeight(offset) {
  return Dimensions.get('window').height - offset;
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

function interpolateIconColor(scrollY, detailsTopOffset) {
  return scrollY.interpolate({
    inputRange: [0, detailsTopOffset / 3],
    outputRange: ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'],
  });
}

function createAnimatedHeaderStyle(headerStyle, animatedValue, headerHeight) {
  return [headerStyle, {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [-headerHeight, 0, headerHeight],
          outputRange: [headerHeight / 2, 0, -headerHeight / 3],
        }),
      },
    ],
  }];
}

function createNavigationBarStyle(scrollY, detailsTopOffset) {
  return {
    container: {
      backgroundColor: scrollY.interpolate({
        inputRange: [0, detailsTopOffset / 3],
        outputRange: ['rgba(0,0,0,0)', 'rgba(255,255,255,0.9)'],
        extrapolate: 'clamp',
      }),
    },
    defaultBackButton: {
      buttonIcon: {
        color: interpolateIconColor(scrollY, detailsTopOffset),
      },
    },
  };
}

function createScreenTitle(titleStyle, title, scrollY, detailsTopOffset) {
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        titleStyle,
        {
          color: scrollY.interpolate({
            inputRange: [0, 0.8 * detailsTopOffset, detailsTopOffset],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#000'],
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
  const iconColor = interpolateIconColor(scrollY, detailsTopOffset);
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
    const navigationBarStyle = createNavigationBarStyle(scrollY, detailsTopOffset);
    const screenTitle = createScreenTitle(style.navBarTitle, title, scrollY, detailsTopOffset);
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

    this.renderNavBar();

    return (
      <View style={style.screen}>
        <Animated.View
          style={headerStyle}
        >
          <NewsGridBox
            style={style.headline}
            headline={article.title.toUpperCase()}
            newsDetails={[article.author, moment(article.timeUpdated).fromNow()]}
            backgroundImage={{ uri: _.get(article, 'image.url'), width: 200, height: 200 }}
          />
          <View style={style.scrollIndicator} />
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
    headline: {
      backgroundColor: 'transparent',
    },
  },
  navBarTitle: {
    [INCLUDE]: ['baseFont'],
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
    bottom: 80,
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: null,
    width: null,
    flex: 1,
  },
  shareButton: {
    buttonIcon: {
      fontSize: 24,
      width: 40,
      height: 40,
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
      },
    },
    contentWrapper: {
      flex: 1,
      flexDirection: 'column',
      opacity: 0.5,
    },
    label: {
      marginBottom: 40,
      [INCLUDE]: ['baseFont'],
      fontSize: 15,
      color: '#fff',
    },
    articleTitle: {
      [INCLUDE]: ['baseFont'],
      color: '#fff',
      fontSize: 16,
      width: 250,
    },
  },
};

export default connectStyle('shoutem.news.DetailsScreen', style)(ArticleDetailsScreen);
