import React from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { GridView } from 'shoutem.ui';
import GridArticleView from '../components/GridArticleView';
import {
  ArticlesListScreen,
  newsMapStateToProps,
  newsMapDispatchToProps,
} from './ArticlesListScreen';

class ArticlesGridScreen extends ArticlesListScreen {
  static propTypes = {
    ...ArticlesListScreen.propTypes,
    gridColumns: React.PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(article) {
    const { style } = this.props;
    if (article.featured) {
      return this.renderFeaturedArticle(article);
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
    return (
      <GridView
        gridColumns={gridColumns}
        items={searchTerm ? searchedNews : news}
        renderGridItem={this.renderItem}
        onRefresh={this.refreshNews}
        status={this.state.fetchStatus}
        style={style.gridView}
      />
    );
  }
}

const style = {
  navigationBarTextColor: {
    color: '#fff',
  },
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
    gridRow: {
      container: {
        paddingHorizontal: 2.5,
      },
      gridItemContainer: {
        margin: 2.5,
      },
    },
  },
  navigationBar: {
    backgroundImage: {
      backgroundColor: '#2c2c2c',
    },
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
      },
    },
    navigationBarTitle: {
      [INCLUDE]: ['navigationBarTextColor'],
    },
  },
  featuredItem: {
    gridBox: {
      container: {
        padding: 5,
        backgroundColor: '#2c2c2c',
      },
      contentWrapper: {
        flexWrap: 'wrap',
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
  screen: {},
  gridColumn: {
    [INCLUDE]: ['shoutem.ui.ListItem.photoCentric'],
  },
};

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.GridScreen', style)(ArticlesGridScreen)
);
