import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { AdvancedListView } from 'shoutem.ui';
import ListArticleView from '../components/ListArticleView';
import FeaturedArticleView from '../components/FeaturedArticleView';
import NewsCategoriesDropDown from '../components/NewsCategoriesDropDown';
import { bindActionCreators } from 'redux';
import { clear, ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { actions } from '../index';
import { navigateTo } from 'shoutem/navigation';
import {
  getNewsCategories,
} from '../actions';
import {
  DataSchemas,
  EXT,
  Screens,
} from '../const.js';

const Status = AdvancedListView.Status;

export class ArticlesListScreen extends Component {
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
    this.setState({ fetchStatus: Status.LOADING });
    this.fetchNews();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > 0 && !nextProps.selectedCategory) {
      this.categorySelected(nextProps.categories[0]);
    }
  }

  onSearchChanged(searchTerm) {
    this.setState({ searchTerm });
  }

  // renderHeader() {
  //   return (<Search
  //     style={props.style.search} // todo - add style to style :/
  //     searchTerm={this.state.searchTerm}
  //     onSearchTermChange={this.onSearchTermChanged}
  //     placeholder={searchPlaceholder}
  //   />);
  // }
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
    this.setState({ fetchStatus: Status.REFRESHING });
    this.fetchNews();
  }

  loadMoreNews() {
    // TODO(Braco) - Redux Api Next
  }


  categorySelected(category) {
    this.setState({ selectedCategory: category });
  }

  openDetailsScreen(article) {
    const route = { screen: Screens.ArticleDetailsScreen, props: { article } };
    this.props.navigateToRoute(route);
  }

  renderRow(article) {
    const { style } = this.props;
    if (article.featured) {
      return (
        <FeaturedArticleView
          article={article}
          style={style.featuredItem}
          onPress={this.openDetailsScreen}
        />
      );
    }

    return (
      <ListArticleView
        article={article}
        style={style.listRow}
        onPress={this.openDetailsScreen}
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
      <AdvancedListView
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
      categories,
    } = this.props;
    const { selectedCategory } = this.state;

    setNavBarProps({
      rightComponent: categories.length > 1 ? <NewsCategoriesDropDown
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
  [DataSchemas.Articles]: '["shoutem.news"].news',
  [DataSchemas.Images]: '["shoutem.news"].newsImages',
  'shoutem.core.applications': '["shoutem.news"].applications',
  [DataSchemas.Categories]: '["shoutem.news"].categories',
};

export function newsMapStateToProps(state) {
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
}

export function newsMapDispatchToProps(dispatch) {
  return {
    clearSearch: bindActionCreators(() => clear(DataSchemas.Articles, 'searchedNews'), dispatch),
    findNews: bindActionCreators(actions.findNews, dispatch),
    navigateToRoute: bindActionCreators(navigateTo, dispatch),
    getNewsCategories: bindActionCreators(getNewsCategories, dispatch),
  };
}

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ArticlesListScreen)
);
