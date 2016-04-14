import React, {
  View,
  ListView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'redux-json-api';

import { connectStyle } from 'shoutem/theme';
import { LargeGridItem, MediumListItem } from 'shoutem.ui';
import { navigateTo } from 'shoutem/navigation';

function formatDate(dateString) {
  let date = new Date(dateString);
  if (!date.getDate()) {
    date = new Date();
  }
  return `${date.getDay()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;
}


function renderRow(item, style, extrasSeparator, onPress) {
  if (item.featured) {
    return (
      <LargeGridItem
        backgroundImage={item.image}
        headline={item.description.toUpperCase()}
        infoFields={[item.source, item.date]}
        style={style.featuredItem}
      />
    );
  }

  return (
    <MediumListItem
      description={item.title}
      image={{ uri: item.image_url }}
      extrasSeparatorImage={extrasSeparator}
      leftExtra={item.author}
      rightExtra={formatDate(item.published_at)}
      id={item.id}
      style={style.items}
      onPressItem={item}
      onPressMethod={onPress}
    />
  );
}

function GannettListScreen({
  news,
  style,
  setNavBarProps,
  getGannetNews,
  navigateToRoute,
}) {
  const extrasSeparator = require('../assets/circle_grey.png');
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSourceItems = dataSource.cloneWithRows(news);

  const navBarTitle = <Text>News</Text>;
  setNavBarProps({
    centerComponent: navBarTitle,
  });

  getGannetNews();

  function openDetailsScreen(item) {
    const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item } };
    navigateToRoute(route);
  }

  function renderGannetListRow(item) {
    renderRow(item, style, extrasSeparator, openDetailsScreen);
  }

  return (
    <View style={style.screen}>
      <ListView
        style={style.list}
        dataSource={dataSourceItems}
        renderRow={renderGannetListRow}
      />
    </View>
  );
}

GannettListScreen.propTypes = {
  news: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  getGannetNews: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};

const style = {
  screen: {},
  h1: {},
  list: {},
  featuredItem: {},
  items: {},
};

function fetchLatestNewsFromState(state) {
  const news = state['gannet.news'].news; // storage
  const latestNews = [];

  // latestNews = collection
  state['gannet.news'].latestNews.forEach(id => {
    const singleNews = news[id];
    if (singleNews) {
      latestNews.push(singleNews);
    }
  });

  return latestNews;
}

function mapStateToProps(state) {
  return {
    news: fetchLatestNewsFromState(state),
  };
}

function findGannettNews() {
  return find(
    {
      endpoint: 'http://gannett.getsandbox.com/gannett/news',
      headers: { 'Content-Type': 'application/json' },
    },
    'gannett.news',
    'latestNews'
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getGannetNews: bindActionCreators(findGannettNews, dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen)
);
