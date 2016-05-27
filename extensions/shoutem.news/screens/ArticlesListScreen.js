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
import { ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { actions } from '../index';
import { navigateTo } from 'shoutem/navigation';
import {
  getNewsCategories,
  schemasMap,
} from '../actions';

import {
  DataSchemas,
  EXT,
  Screens,
  Sections,
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
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.renderArticle = this.renderArticle.bind(this);
    this.state = {
      selectedCategory: null,
      fetchStatus: null,
    };
  }

  componentWillMount() {
    const {
      fetchNewsCategories,
      settings,
    } = this.props;

    if (settings.categoryIds && settings.categoryIds.length > 0) {
      this.setState({ fetchStatus: Status.LOADING }, this.fetchNews);
    } else {
      this.setState(
        { fetchStatus: Status.LOADING },
        () => fetchNewsCategories(settings.parentCategoryId, settings)
      );
    }
  }

  getSectionId(item) {
    return item.featured ? Sections.FEATURED : Sections.RECENT;
  }

  shouldRenderCategoriesDropDown(categories, categoriesIds) {
    return categories.length > 1 && (!categoriesIds || categoriesIds.length === 0);
  }

  fetchNews() {
    const { settings, findNews } = this.props;
    const { selectedCategory } = this.state;

    const categories = settings.categoryIds ? settings.categoryIds : [selectedCategory.id];

    findNews(categories, settings).then(() => {
      this.setState({ fetchStatus: Status.IDLE });
    });
  }

  refreshNews() {
    this.setState({ fetchStatus: Status.REFRESHING }, this.fetchNews);
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

  renderSectionHeader(section) {
    const { style } = this.props;
    if (section === Sections.RECENT) {
      return <Text style={style.sectionHeader}>Recent</Text>;
    }
    return null;
  }

  renderCategoriesDropDown() {
    const { categories, style, settings } = this.props;
    if (!this.shouldRenderCategoriesDropDown(categories, settings.categoryIds)) {
      return null;
    }
    return (
      <DropDownMenu
        items={categories}
        bindings={{ text: 'name', value: 'id' }}
        onItemSelected={this.categorySelected}
        selectedItem={this.state.selectedCategory}
        style={style.navigation.categoriesDropDown}
      />
    );
  }

  renderArticle(article, style) {
    return (
      <ListArticleView
        article={article}
        style={style.listRow}
        onPress={this.openDetailsScreen}
      />
    );
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

    return this.renderArticle(article, style);
  }

  renderArticles() {
    const {
      style,
      news,
    } = this.props;
    return (
      <ListView
        items={news}
        renderRow={this.renderRow}
        status={this.state.fetchStatus}
        style={style.listView}
        getSectionId={this.getSectionId}
        onRefresh={this.refreshNews}
        renderSectionHeader={this.renderSectionHeader}
      />
    );
  }

  render() {
    const {
      style,
      setNavBarProps,
      settings,
    } = this.props;
    const screenTitle = settings.title || 'News';

    setNavBarProps({
      rightComponent: this.renderCategoriesDropDown(),
      centerComponent: (
        <Text style={style.navigation.navigationBarTitle}>
          {screenTitle.toUpperCase()}
        </Text>
      ),
      style: style.navigation.navigationBar,
    });

    return (
      <View style={style.screen}>
        {this.renderArticles()}
      </View>
    );
  }
}

const style = {
  navigationBarTextColor: {
    color: '#fff',
  },
  navigation: {
    navigationBar: {
      backgroundImage: {
        backgroundColor: '#2c2c2c',
      },
    },
    categoriesDropDown: {
      popUpButton: {
        buttonText: {
          [INCLUDE]: ['navigationBarTextColor'],
        },
        buttonIcon: {
          [INCLUDE]: ['navigationBarTextColor'],
        },
      },
    },
    navigationBarTitle: {
      [INCLUDE]: ['navigationBarTextColor'],
    },
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
  sectionHeader: {
    color: '#888888',
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: 12,
    [INCLUDE]: ['baseFont'],
  },
  screen: {},
  featuredItem: {
    gridBox: {
      contentWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 330,
        padding: 20,
      },
      backgroundImage: {
        borderRadius: 2,
      },
    },
  },
  listRow: {
    [INCLUDE]: ['shoutem.ui.ListItem.textCentric'],
  },
};

// written as variable to be able to debug in Chrome debugger
export const newsMapStateToProps = (state) => {
  const denormalizer = new ReduxApiStateDenormalizer(() => state, schemasMap);
  return {
    news: denormalizer.denormalizeCollection(
      state[EXT].latestNews, DataSchemas.Articles
    ),
    categories: denormalizer.denormalizeCollection(
      state[EXT].newsCategories, DataSchemas.Categories
    ),
  };
};

// written as variable to be able to debug in Chrome debugger
export const newsMapDispatchToProps = (dispatch) => ({
  findNews: bindActionCreators(actions.findNews, dispatch),
  navigateToRoute: bindActionCreators(navigateTo, dispatch),
  fetchNewsCategories: bindActionCreators(getNewsCategories, dispatch),
});

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ArticlesListScreen)
);
