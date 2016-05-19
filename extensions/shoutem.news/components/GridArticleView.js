import React from 'react';
import _ from 'lodash';
import { ListItem } from 'shoutem.ui';
import moment from 'moment';

export default class GridArticleView extends React.Component {
  static propTypes = {
    // Custom GridArticleView style
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
