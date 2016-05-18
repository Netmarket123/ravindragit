import React from 'react';
import _ from 'lodash';
import { ListItem } from 'shoutem.ui';
import moment from 'moment';

export default class ArticleGridItem extends React.Component {
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

    return (<ListItem
      key={article.id}
      description={article.title}
      image={{ uri: _.get(article, 'image.url') }}
      leftExtra={moment(article.timeUpdated).fromNow()}
      id={article.id}
      style={style.gridColumn}
      onPressItem={article}
      onPressMethod={this.onPress}
    />);
  }
}
