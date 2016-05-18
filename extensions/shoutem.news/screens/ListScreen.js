import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { AdvancedListView } from 'shoutem.ui';
import ArticleListItem from '../components/ArticleListItem';
import ArticleFeaturedItem from '../components/ArticleFeaturedItem';
import NewsCategories from '../components/NewsCategories';
import { bindActionCreators } from 'redux';
import { clear, ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { actions, SHOUTEM_NEWS_EXT_NAME } from '../index';
import { navigateTo } from 'shoutem/navigation';
import {
  getNewsCategories,
  SHOUTEM_NEWS_SCHEME,
  SHOUTEM_IMAGES_SCHEME,
  SHOUTEM_CATEGORIES_SCHEME,
} from '../actions';

export class ListScreen extends Component {
  static propTypes = {
    settings: React.PropTypes.object, // TODO(Braco) - clean up
    findNews: React.PropTypes.func,
    clearSearch: React.PropTypes.func,
    parentCategoryId: React.PropTypes.any,
    news: React.PropTypes.array,
    searchedNews: React.PropTypes.array,
    categories: React.PropTypes.array,
    style: React.PropTypes.object,
    setNavBarProps: React.PropTypes.func,
    navigateToRoute: React.PropTypes.func,
    getNewsCategories: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    props.getNewsCategories(props.parentCategoryId, props.settings);
    this.fetchNews = this.fetchNews.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.state = {
      searchTerm: '',
      selectedCategory: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > 0 && !nextProps.selectedCategory) {
      this.categorySelected(nextProps.categories[0]);
    }
  }

  onSearchChanged(searchTerm) {
    this.setState({ searchTerm });
  }

  categorySelected(category) {
    this.setState({ selectedCategory: category });
  }

  openDetailsScreen(item) {
    const route = { screen: 'shoutem.news.DetailsScreen', props: { item } };
    this.props.navigateToRoute(route);
  }

  isSearch(searchTerm) {
    return Boolean(searchTerm);
  }

  fetchNews(queryParams, isLoadMore) {
    const { settings, findNews, clearSearch, searchedNews } = this.props;
    let offset;
    if (
      !this.isSearch(queryParams.searchTerm, queryParams.selectedCategory) &&
      searchedNews.length > 0
    ) {
      clearSearch();
    }

    if (isLoadMore) {
      offset = 1;
    }

    if (isLoadMore) {
      return undefined;
    }

    return findNews(queryParams.searchTerm, queryParams.selectedCategory, offset, settings);
  }

  renderRow(article) {
    const { style } = this.props;
    if (article.featured) {
      return (<ArticleFeaturedItem
        article={article}
        style={style}
        onPress={this.openDetailsScreen}
      />);
    }

    return (<ArticleListItem
      article={article}
      style={style}
      onPress={this.openDetailsScreen}
    />);
  }

  renderArticles() {
    const {
      style,
      news,
      searchedNews,
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;
    const showSearchResults = this.isSearch(searchTerm);
    return (<AdvancedListView
      items={showSearchResults ? searchedNews : news}
      search
      infiniteScrolling
      onRefresh={showSearchResults}
      onSearchTermChanged={this.onSearchChanged}
      queryParams={{ searchTerm, selectedCategory }}
      fetch={this.fetchNews}
      renderRow={this.renderRow}
      style={style.listView}
    />);
  }

  render() {
    const {
      style,
      setNavBarProps,
      categories,
    } = this.props;
    const { selectedCategory } = this.state;

    setNavBarProps({
      rightComponent: categories.length > 1 ? <NewsCategories
        categories={categories}
        selectedCategory={selectedCategory}
        categorySelected={this.categorySelected}
        style={style.categoriesDropDown}
      /> : null,
      centerComponent: (<Text style={style.navBarTitle}>News</Text>),
      style: style.navigationBar,
    });

    return (
      <View style={style.screen}>
        {selectedCategory ? this.renderArticles() : null}
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

const schemasMap = {
  [SHOUTEM_NEWS_SCHEME]: '["shoutem.news"]news',
  [SHOUTEM_IMAGES_SCHEME]: '["shoutem.news"]newsImages',
  'shoutem.core.applications': '["shoutem.news"]applications',
  'shoutem.core.categories': '["shoutem.news"]categories',
};

export function newsMapStateToProps(state) {
  const denormalizer = new ReduxApiStateDenormalizer(() => state, schemasMap);
  return {
    news: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].latestNews, SHOUTEM_NEWS_SCHEME
    ),
    searchedNews: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].searchedNews, SHOUTEM_NEWS_SCHEME
    ),
    categories: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].newsCategories,
      SHOUTEM_CATEGORIES_SCHEME,
      { [SHOUTEM_CATEGORIES_SCHEME]: state[SHOUTEM_NEWS_EXT_NAME].categories }
    ),
  };
}

export function newsMapDispatchToProps(dispatch) {
  return {
    clearSearch: bindActionCreators(() => clear(SHOUTEM_NEWS_SCHEME, 'searchedNews'), dispatch),
    findNews: bindActionCreators(actions.findNews, dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
    getNewsCategories: bindActionCreators(getNewsCategories, dispatch),
  };
}

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ListScreen)
);
