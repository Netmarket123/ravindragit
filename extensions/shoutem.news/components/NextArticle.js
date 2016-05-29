import React, {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';
import { GridBox } from 'shoutem.ui';
import { bindActionCreators } from 'redux';
import { navigateTo } from 'shoutem/navigation';
import { connect } from 'react-redux';
import {
  Screens,
} from '../const.js';


class NextArticle extends React.Component {
  constructor(props) {
    super(props);
    this.openNextArticle = this.openNextArticle.bind(this);
  }

  openNextArticle() {
    const { article, articles } = this.props;
    const route = {
      screen: Screens.ArticleDetailsScreen,
      props: {
        article,
        articles,
        showNext: true,
      },
    };
    this.props.navigateToRoute(route);
  }

  render() {
    const {
      article,
      style,
    } = this.props;
    const backgroundImage = { uri: _.get(article, 'image.url') };
    return (
      <GridBox
        style={style.gridBox}
        backgroundImage={backgroundImage}
      >
        <TouchableHighlight
          activeOpacity={1}
          style={style.contentWrapper}
          onPress={this.openNextArticle}
        >
          <View>
            <Text style={style.label}>UP NEXT</Text>
            <Text
              style={style.articleTitle}
              numberOfLines={2}
            >
              {article.title}
            </Text>
          </View>
        </TouchableHighlight>
      </GridBox>
    );
  }
}

NextArticle.propTypes = {
  article: React.PropTypes.object,
  style: React.PropTypes.object,
  articles: React.PropTypes.array,
  navigateToRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(NextArticle);
