import React, {
  View,
  Text,
  Component,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'redux-api-state';

import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem, AdvancedListView } from 'shoutem.ui';
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
  constructor(props, context) {
    super(props, context);
    this.fetch = this.fetch.bind(this);
    this.onSearchCleared = this.onSearchCleared.bind(this);
  }

  onSearchCleared() {
    // reset searched news
  }

  fetch(searchTerm) {
    if (searchTerm) {
      alert(`Apply search! Search term: ${searchTerm}`);
    }
    this.props.getGannetNews().then(() => {
      // this is also possible solution, to set items trough callback
      // setRows(this.props.news);
    });
  }

  render() {
    const {
      style,
      setNavBarProps,
      navigateToRoute,
      news,
      searchedNews,
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
        <AdvancedListView
          items={news}
          search
          searchedItems={searchedNews}
          onSearchCleared={this.onSearchCleared}
          fetch={this.fetch}
          renderRow={renderGannetListRow}
          style={style.listView}
        />
      </View>
    );
  }
}

GannettListScreen.propTypes = {
  getGannetNews: React.PropTypes.func,
  news: React.PropTypes.array,
  searchedNews: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};

const style = {
  listView: {
    header: {
      container: {
      },
      search: {
      },
    },
    list: {
    },
    listContent: {
    },
  },
  screen: {},
  h1: {},
  list: {},
  featuredItem: {},
  items: {
    [INCLUDE]: ['shoutem.ui.ListItem.photoCentric'],
  },
};

function fetchNewsFromState(state, collectionName = 'latestNews') {
  const news = state['gannet.news'].news; // storage
  const newsCollection = [];

  // latestNews = collection
  state['gannet.news'][collectionName].forEach(id => {
    newsCollection.push(news[id]);
  });

  return newsCollection;
}

function mapStateToProps(state) {
  return {
    news: fetchNewsFromState(state),
    searchedNews: fetchNewsFromState(state, 'searchedNews'),
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
