import React from 'react';
import _ from 'lodash';
import { ListItem } from '@shoutem/ui';
import moment from 'moment';

/**
 * Component used to render single list article item
 */
export default class ListArticleView extends React.Component {
  static propTypes = {
    // Custom ListArticleView style
    style: React.PropTypes.object,
    // onPress callback function, activated on View press
    onPress: React.PropTypes.func,
    // Item used to bind data
    article: React.PropTypes.object.isRequired,
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
      <ListItem
        description={article.title}
        image={{ uri: _.get(article, 'image.url') }}
        leftExtra={moment(article.timeUpdated).fromNow()}
        id={article.id}
        style={style}
        onPress={this.onPress}
        fallbackImage={require('../assets/images/image-fallback.png')}
      />
    );
  }
}
