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
import { ReduxApiStateDenormalizer, isBusy } from '@shoutem/redux-api-state';
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
class DenormalizeService {
  constructor() {
    this.denormalizeInstance = null;
  }
  createNewInstance(state) {
    this.denormalizeInstance = new ReduxApiStateDenormalizer(() => state, schemasMap);
  }
  get() {
    return this.denormalizeInstance;
  }
}
const denormalizeService = new DenormalizeService();

export class ArticlesListScreen extends Component {
  static propTypes = {
    settings: React.PropTypes.object,
    findNews: React.PropTypes.func,
    clearSearch: React.PropTypes.func,
    parentCategoryId: React.PropTypes.any,
    newsCollection: React.PropTypes.array,
    categoriesCollection: React.PropTypes.array,
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
      news: [],
      categories: [],
    };
  }

  componentWillMount() {
    const {
      fetchNewsCategories,
      settings,
      categoriesCollection,
      newsCollection,
    } = this.props;

    if (settings.categoryIds && settings.categoryIds.length > 0) {
      this.setState({ fetchStatus: Status.LOADING }, this.fetchNews);
    } else if (categoriesCollection.length === 0) {
      this.setState(
        { fetchStatus: Status.LOADING },
        () => fetchNewsCategories(settings.parentCategoryId, settings)
      );
    }

    if (categoriesCollection.length > 0) {
      const categories = this.denormalizeCategories(categoriesCollection);
      this.setState({ selectedCategory: categories[0] });
    }

    if (newsCollection.length > 0) {
      this.denormalizeNews(newsCollection);
    }
  }

  shouldComponentUpdate(nextProps) {
    const newsBusy = isBusy(nextProps.newsCollection);
    const categoriesBusy = isBusy(nextProps.categoriesCollection);
    if (newsBusy || categoriesBusy) {
      return false;
    }
    const updateNews =
      !newsBusy &&
      nextProps.newsCollection !== this.props.newsCollection;

    const updateCategories =
      !categoriesBusy &&
      nextProps.categoriesCollection !== this.props.categoriesCollection;

    if (updateNews) {
      this.denormalizeNews(nextProps.newsCollection);
    }

    if (updateCategories) {
      this.denormalizeCategories(nextProps.categoriesCollection);
    }
    return true;
  }

  getSectionId(item) {
    return item.featured ? Sections.FEATURED : Sections.RECENT;
  }

  denormalizeNews(newsCollection) {
    const denormalizer = denormalizeService.get();
    const news = denormalizer.denormalizeCollection(
      newsCollection, DataSchemas.Articles
    );
    this.setState({ news });
    return news;
  }

  denormalizeCategories(categoriesCollection) {
    const denormalizer = denormalizeService.get();
    const categories = denormalizer.denormalizeCollection(
      categoriesCollection, DataSchemas.Categories
    );
    this.setState({ categories });
    return categories;
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
    const { settings } = this.props;
    const route = {
      screen: Screens.ArticleDetailsScreen,
      props: {
        article,
        articles: this.state.news,
        showNext: settings.showNextArticleOnDetails,
      },
    };
    this.props.navigateToRoute(route);
  }

  renderCategoriesDropDown() {
    const { style, settings } = this.props;
    const { categories } = this.state;
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

  renderNavBar() {
    const {
      setNavBarProps,
      style,
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
  }

  renderSectionHeader(section) {
    const { style } = this.props;
    if (section === Sections.RECENT) {
      return <Text style={style.sectionHeader}>Recent</Text>;
    }
    return null;
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
    } = this.props;
    const { news } = this.state;
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
    } = this.props;

    this.renderNavBar();

    const articles = this.renderArticles();

    return (
      <View style={style.screen}>
        {articles}
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
  denormalizeService.createNewInstance(state, schemasMap);
  return {
    newsCollection: state[EXT].latestNews,
    categoriesCollection: state[EXT].newsCategories,
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
