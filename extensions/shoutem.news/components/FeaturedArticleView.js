import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { NewsGridBox } from 'shoutem.ui';

// Component used to render featured news articles
export default class FeaturedArticleView extends React.Component {
  static propTypes = {
    // Custom FeaturedArticleView style
    style: React.PropTypes.object,
    // onPress callback function, activated on View press
    onPress: React.PropTypes.func,
    // Item used to bind data
    article: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.article);
  }

  render() {
    const {
      article,
      style,
    } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress} key={article.id}>
        <NewsGridBox
          backgroundImage={{ uri: _.get(article, 'image.url') }}
          headline={article.title.toUpperCase()}
          style={style}
        />
      </TouchableOpacity>
    );
  }
}
