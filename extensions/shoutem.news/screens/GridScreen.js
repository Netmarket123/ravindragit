import React from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { AdvancedGridView } from 'shoutem.ui';
import FeaturedArticleView from '../components/FeaturedArticleView';
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
      return (
        <FeaturedArticleView
          article={article}
          style={style.featuredItem}
          onPress={this.openDetailsScreen}
        />
      );
    }

    return (
      <GridArticleView
        article={article}
        style={style.gridColumn}
        onPressMethod={this.openDetailsScreen}
      />
    );
  }

  renderArticles() {
    const {
      style,
      news,
      searchedNews,
      gridColumns,
    } = this.props;
    const { searchTerm } = this.state;
    const isSearchActive = this.isSearch(searchTerm);
    return (
      <AdvancedGridView
        gridColumns={gridColumns}
        items={isSearchActive ? searchedNews : news}
        renderGridItem={this.renderItem}
        onRefresh={this.refreshNews}
        status={this.state.fetchStatus}
        style={style.gridView}
      />
    );
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


