import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { NewsGridBox } from 'shoutem.ui';

export default class FeaturedArticleItem extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    onPress: React.PropTypes.func,
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

    return (<TouchableOpacity onPress={this.onPress} key={article.id}>
      <NewsGridBox
        backgroundImage={{ uri: _.get(article, 'image.url') }}
        headline={article.title.toUpperCase()}
        infoFields={['News', 'Sprint 6']}
        style={style.featuredItem}
      />
    </TouchableOpacity>);
  }
}
