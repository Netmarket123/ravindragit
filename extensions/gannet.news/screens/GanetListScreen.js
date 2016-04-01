import React, {
  View,
  ListView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'redux-json-api';
import connectStyle from 'shoutem/theme/StyleConnector';
import { LargeGridItem, MediumListItem } from 'shoutem.ui';
import { navigateTo } from 'shoutem/navigation';

function formatDate(dateString) {
  let date = new Date(dateString);
  if (!date.getDate()) {
    date = new Date();
  }
  return `${date.getDay()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;
}

class GannettListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.thisRenderRow = this.renderRow.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    props.getGannetNews();
  }

  openDetailsScreen(item) {
    const { navigateToRoute } = this.props;
    const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item } };

    navigateToRoute(route);
  }

  renderRow(item) {
    const { featureFirst } = this.props;
    this.listCounter += 1;

    if (featureFirst && this.listCounter === 1) {
      return (
        <LargeGridItem
          backgroundImage={item.image}
          headline={item.description.toUpperCase()}
          infoFields={[item.source, item.date]}
          style={this.props.style.featuredItem}
        />
      );
    }

    return (
      <MediumListItem
        description={item.title}
        image={{ uri: item.image_url }}
        extrasSeparatorImage={this.state.extrasSeparator}
        leftExtra={item.author}
        rightExtra={formatDate(item.published_at)}
        id={item.id}
        style={this.props.style.items}
        onPress={() => { this.openDetailsScreen(item) }}
      />
    );
  }

  render() {
    const { style, news: items } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSourceItems = ds.cloneWithRows(items);
    const navBarTtile = <Text style={style.h1}>News</Text>;
    this.listCounter = 0;
    this.props.setNavBarProps({
      centerComponent: navBarTtile,
    });
    return (
      <View style={style.screen}>
        <ListView
          style={style.list}
          dataSource={dataSourceItems}
          renderRow={this.thisRenderRow}
        />
      </View>
    );
  }
}

GannettListScreen.propTypes = {
  setNavBarProps: React.PropTypes.func,
  getGannetNews: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
  news: React.PropTypes.array,
  style: React.PropTypes.object,
  featureFirst: React.PropTypes.bool,
};

const style = {
  screen: {},
  h1: {},
  list: {},
  featuredItem: {},
  items: {},
};

function mapStateToProps(state) {
  const news = state['gannet.news'].news;
  const latestNews = [];
  state['gannet.news'].latestNews.forEach(id => {
    const singleNews = news[id];
    if (singleNews) {
      latestNews.push(singleNews);
    }
  });
  return {
    news: latestNews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGannetNews: bindActionCreators(() => find(
      'http://gannett.getsandbox.com/gannett/news',
      { 'Content-type': 'application/json' },
      'gannett.news',
      'latestNews'
    ), dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen)
);
