import React, {
  View,
  Text,
  Component,
} from 'react-native';
import { clear, find } from 'redux-api-state';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { connectStyle, INCLUDE } from 'shoutem/theme';

import {
  NewsGridBox,
  ListItem,
  DropDownMenu,
  AdvancedListView,
} from 'shoutem.ui';

import { navigateTo } from 'shoutem/navigation';

const GANNETT_SCHEME = 'shoutem.news.articles';

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
      description={item.attributes.title}
      image={{ uri: item.image_url }}
      leftExtra={'News'}
      id={item.id}
      style={style.items}
      onPressItem={{ body: item.attributes.body, title: item.attributes.title }}
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
    this.props.clearSearch();
  }

  fetch(searchTerm) {
    this.props.getGannetNews(searchTerm);
  }

  render() {
    const {
      style,
      setNavBarProps,
      navigateToRoute,
      news,
      searchedNews,
      images,
    } = this.props;
    const extrasSeparator = require('../assets/circle_grey.png');

    const categoryDropDown = (
      <DropDownMenu
        items={[{ name: 'World', id: 1 }, { name: 'Sport', id: 2 }, { name: 'Music', id: 3 }]}
        bindings={{ text: 'name', value: 'id' }}
      />
    );
    setNavBarProps({
      rightComponent: categoryDropDown,
    });

    function openDetailsScreen(item) {
      const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderGannetListRow(item) {
      const imageId = _.get(item, 'relationships.image.data.id');
      if (imageId) {
        item.image_url = _.get(images, `${[imageId]}.attributes.url`);
      }
      return renderRow(item, style, extrasSeparator, openDetailsScreen);
    }

    return (
      <View style={style.screen}>
        <AdvancedListView
          items={searchedNews.length > 0 ? searchedNews : news}
          search
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
  clearSearch: React.PropTypes.func,
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
    [INCLUDE]: ['shoutem.ui.ListItem.textCentric'],
  },
};

function fetchNewsFromState(state, collectionName = 'latestNews') {
  const news = state['gannet.news'].news; // storage
  const newsCollection = [];

  // latestNews = collection
  state['gannet.news'][collectionName].forEach(id => {
    const item = news[id];
    if (!item) {
      return;
    }
    newsCollection.push(news[id]);
  });

  return newsCollection;
}

function mapStateToProps(state) {
  return {
    news: fetchNewsFromState(state),
    images: state['gannet.news'].newsImages,
    searchedNews: fetchNewsFromState(state, 'searchedNews'),
  };
}

function findGannettNews(searchTerm) {
  let query = '';
  let collectionName = 'latestNews';

  if (searchTerm) {
    query = `&query=${searchTerm}`;
    collectionName = 'searchedNews';
  }

  return find(
    {
      endpoint: 'http://api.aperfector.com/v1/apps/1113/resources/shoutem.news.articles?' +
                `include=image${query}`,
      headers: { 'Content-Type': 'application/json' },
    },
    GANNETT_SCHEME,
    collectionName
  );
}

function mapDispatchToProps(dispatch) {
  return {
    clearSearch: bindActionCreators(() => clear(GANNETT_SCHEME, 'searchedNews'), dispatch),
    getGannetNews: bindActionCreators(findGannettNews, dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen)
);
