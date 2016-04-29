import React, {
  View,
  ListView,
  Text,
  Component,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'redux-api-state';

import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem } from 'shoutem.ui';
import { navigateTo } from 'shoutem/navigation';

function renderRow(item, style, extrasSeparator, onPress) {
  if (item.featured) {
    return (
      <NewsGridBox
        backgroundImage={item.image}
        headline={item.description.toUpperCase()}
        infoFields={[item.source, item.date]}
        style={style.featuredItem}
      />
    );
  }

  return (
    <ListItem
      description={item.title}
      image={{ uri: item.image_url }}
      leftExtra={item.author}
      id={item.id}
      style={style.items}
      onPressItem={item}
      onPressMethod={onPress}
    />
  );
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class GannettListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    props.getGannetNews();
  }

  render() {
    const {
      news,
      style,
      setNavBarProps,
      navigateToRoute,
    } = this.props;
    const extrasSeparator = require('../assets/circle_grey.png');
    const dataSourceItems = dataSource.cloneWithRows(news);

    const navBarTitle = <Text>News</Text>;
    setNavBarProps({
      centerComponent: navBarTitle,
    });

    function openDetailsScreen(item) {
      const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderGannetListRow(item) {
      return renderRow(item, style, extrasSeparator, openDetailsScreen);
    }

    return (
      <View style={style.screen}>
        <ListView
          contentContainerStyle={style.listContent}
          style={style.list}
          dataSource={dataSourceItems}
          renderRow={renderGannetListRow}
          enableEmptySections
        />
      </View>
    );
  }
}

GannettListScreen.propTypes = {
  getGannetNews: React.PropTypes.func,
  news: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};

const style = {
  screen: {},
  h1: {},
  list: {},
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featuredItem: {},
  items: {
    [INCLUDE]: ['shoutem.ui.ListItem.textCentric'],
  },
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
