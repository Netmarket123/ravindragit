import React from 'react';
import {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListView, DropDownMenu } from 'shoutem.ui';
import ListArticleView from '../components/ListArticleView';
import FeaturedArticleView from '../components/FeaturedArticleView';
import { bindActionCreators } from 'redux';
import { clear, ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { actions } from '../index';
import { navigateTo } from 'shoutem/navigation';
import {
  getNewsCategories,
  schemasMap,
  Collections,
} from '../actions';

import {
  DataSchemas,
  EXT,
  Screens,
} from '../const.js';

const Status = ListView.Status;

export class ArticlesListScreen extends Component {
  static propTypes = {
    settings: React.PropTypes.object,
    findNews: React.PropTypes.func,
    clearSearch: React.PropTypes.func,
    parentCategoryId: React.PropTypes.any,
    news: React.PropTypes.array,
    searchedNews: React.PropTypes.array,
    categories: React.PropTypes.array,
    style: React.PropTypes.object,
    setNavBarProps: React.PropTypes.func,
    navigateToRoute: React.PropTypes.func,
    fetchNewsCategories: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.fetchNews = this.fetchNews.bind(this);
    this.refreshNews = this.refreshNews.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.state = {
      searchTerm: '',
      selectedCategory: null,
      fetchStatus: null,
    };
  }

  componentWillMount() {
    const {
      fetchNewsCategories,
      settings,
    } = this.props;
    fetchNewsCategories(settings.parentCategoryId, settings);
    this.setState({ fetchStatus: Status.LOADING });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > 0 && !this.state.selectedCategory) {
      this.categorySelected(nextProps.categories[0]);
    }
  }

  onSearchChanged(searchTerm) {
    this.setState({ searchTerm });
  }

  fetchNews() {
    const { settings, findNews, clearSearch, searchedNews } = this.props;
    const { selectedCategory, searchTerm } = this.state;

    let offset;

    if (searchTerm && searchedNews.length > 0) {
      clearSearch();
    }

    findNews(searchTerm, selectedCategory, offset, settings).then(() => {
      this.setState({ fetchStatus: Status.IDLE });
    });
  }

  refreshNews() {
    this.setState({ fetchStatus: Status.REFRESHING }, this.fetchNews);
  }

  loadMoreNews() {
    // TODO(Braco) - Redux Api Next
  }

  categorySelected(category) {
    this.setState(
      {
        selectedCategory: category,
        fetchStatus: Status.LOADING,
      },
      this.fetchNews
    );
  }

  openDetailsScreen(article) {
    const route = { screen: Screens.ArticleDetailsScreen, props: { article } };
    this.props.navigateToRoute(route);
  }

  renderFeaturedArticle(article) {
    return (
      <FeaturedArticleView
        article={article}
        style={this.props.style.featuredItem}
        onPress={this.openDetailsScreen}
      />
    );
  }

  renderRow(article) {
    const { style } = this.props;
    if (article.featured) {
      return this.renderFeaturedArticle(article, style);
    }

    return (
      <ListArticleView
        article={article}
        style={style.listRow}
        onPress={this.openDetailsScreen}
      />
    );
  }

  renderCategoriesDropDown() {
    const { categories, style } = this.props;
    if (categories.length < 1) {
      return null;
    }
    return (
      <DropDownMenu
        items={categories}
        bindings={{ text: 'name', value: 'id' }}
        onItemSelected={this.categorySelected}
        selectedItem={this.state.selectedCategory}
        style={style.categoriesDropDown}
      />
    );
  }

  renderArticles() {
    const {
      style,
      news,
      searchedNews,
    } = this.props;
    const { searchTerm } = this.state;
    return (
      <ListView
        items={searchTerm ? searchedNews : news}
        renderRow={this.renderRow}
        onRefresh={this.refreshNews}
        status={this.state.fetchStatus}
        style={style.listView}
      />
    );
  }

  render() {
    const {
      style,
      setNavBarProps,
    } = this.props;

    setNavBarProps({
      rightComponent: this.renderCategoriesDropDown(),
      centerComponent: (<Text style={style.navBarTitle}>News</Text>),
      style: style.navigationBar,
    });

    return (
      <View style={style.screen}>
        {this.renderArticles()}
      </View>
    );
  }
}

const style = {
  navigationBar: {
    backgroundImage: {
      backgroundColor: '#2c2c2c',
    },
  },
  categoriesDropDown: {
    popUpButton: {
      buttonText: {
        [INCLUDE]: ['navBarTitle'],
      },
    },
  },
  navBarTitle: {
    color: '#fff',
  },
  listView: {
    header: {
      container: {},
      search: {
        container: {
          backgroundColor: '#2c2c2c',
        },
      },
    },
    list: {},
    listContent: {},
  },
  screen: {},
  featuredItem: {
    gridBox: {
      contentWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 330,
      },
    },
  },
  listRow: {
    [INCLUDE]: ['shoutem.ui.ListItem.textCentric'],
  },
};

// written as variable to be able to debug in Chrome debugger
export const newsMapStateToProps = function (state) {
  const denormalizer = new ReduxApiStateDenormalizer(() => state, schemasMap);
  return {
    news: denormalizer.denormalizeCollection(
      state[EXT].latestNews, DataSchemas.Articles
    ),
    searchedNews: denormalizer.denormalizeCollection(
      state[EXT].searchedNews, DataSchemas.Articles
    ),
    categories: denormalizer.denormalizeCollection(
      state[EXT].newsCategories, DataSchemas.Categories
    ),
  };
};
// written as variable to be able to debug in Chrome debugger
export const newsMapDispatchToProps = function (dispatch) {
  return {
    clearSearch: bindActionCreators(
      () => clear(DataSchemas.Articles, Collections.SearchedNews), dispatch
    ),
    findNews: bindActionCreators(actions.findNews, dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
    fetchNewsCategories: bindActionCreators(getNewsCategories, dispatch),
  };
};

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ArticlesListScreen)
);
