import React, {
  View,
  Text,
  Component,
  measure,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'redux-api-state';

import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem, ShoutemListView } from 'shoutem.ui';
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

class GannettListScreen extends Component {
  static state = {
    headerHeight: 0,
  }

  constructor(props, context) {
    super(props, context);
    this.onFetch = this.onFetch.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  onFetch(page = 1, callback, options) {
    this.props.getGannetNews().then(() => {
      callback(this.props.news);
    });
  }

  renderHeader() {
    return (<View>
      <Text style={this.props.style.search}>Search</Text>
    </View>);
  }


  render() {
    const {
      style,
      setNavBarProps,
      navigateToRoute,
    } = this.props;
    const extrasSeparator = require('../assets/circle_grey.png');

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
        <ShoutemListView
          registerScrollRef={(WrappedListView) => {
            this.listView = WrappedListView;
          }}
          onFetch={this.onFetch}
          renderRow={renderGannetListRow}
          headerView={this.renderHeader}
          style={style.listView}
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
  listView: {
    search: {
      backgroundColor: 'red',
      height: 50,
    }
  },
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
