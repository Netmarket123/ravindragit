import React from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { AdvancedGridView } from 'shoutem.ui';
import ArticleFeaturedView from '../components/ArticleFeaturedView';
import GridArticleView from '../components/GridArticleView';
import { ListScreen, newsMapStateToProps, newsMapDispatchToProps } from './ListScreen';


class GridScreen extends ListScreen {
  static propTypes = Object.assign({}, ListScreen.propTypes, {
    gridColumns: React.PropTypes.number,
  });
  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(article) {
    const { style } = this.props;
    if (article.featured) {
      return (<ArticleFeaturedView
        article={article}
        style={style}
        onPress={this.openDetailsScreen}
      />);
    }

    return (<GridArticleView
      article={article}
      style={style}
      onPressMethod={this.openDetailsScreen}
    />);
  }

  renderArticles() {
    const {
      style,
      news,
      searchedNews,
      gridColumns,
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;
    const showSearchResults = this.isSearch(searchTerm);
    return (<AdvancedGridView
      items={showSearchResults ? searchedNews : news}
      gridColumns={gridColumns}
      search
      infiniteScrolling
      notRefreshable={showSearchResults}
      onSearchTermChanged={this.onSearchChanged}
      queryParams={{ searchTerm, selectedCategory }}
      fetch={this.fetchNews}
      renderGridItem={this.renderItem}
      style={style.gridView}
    />);
  }
}

const style = {
  gridView: {
    header: {
      container: {},
      search: {
        container: {
          backgroundColor: '#2c2c2c',
        },
      },
    },
    list: {
      paginationView: {
        height: 0,
        marginTop: 10,
      },
      actionsLabel: {
        height: 0,
        backgroundColor: 'red',
      },
    },
    listContent: {},
    gridItemWrapper: {
      padding: 5,
    },
  },
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
  featuredItem: {
    gridBox: {
      container: {
        padding: 5,
        backgroundColor: '#2c2c2c',
      },
      contentWrapper: {
        flexWrap: 'wrap',
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: 330,
      },
    },
  },
  screen: {},
  gridColumn: {
    [INCLUDE]: ['shoutem.ui.ListItem.photoCentric'],
  },
};

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.GridScreen', style)(GridScreen)
);


