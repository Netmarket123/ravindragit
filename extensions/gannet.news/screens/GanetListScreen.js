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

class GannettListScreen extends React.Component {
  static propTypes = {
    items: React.PropTypes.array,
    style: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    setNavBarProps: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.thisRenderRow = this.renderRow.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    props.getGannetNews();
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  openDetailsScreen(item) {
    const { navigateToRoute } = this.props;
    const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item } };
    navigateToRoute(route);
  }

  renderRow(item) {
    if (item.featured) {
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

  componentDidMount() {
    const navBarTtile = <Text>News</Text>;
    this.props.setNavBarProps({
      centerComponent: navBarTtile,
    });
  }
  render() {
    const { style, news: items } = this.props;
    const dataSourceItems = this.dataSource.cloneWithRows(items);

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
