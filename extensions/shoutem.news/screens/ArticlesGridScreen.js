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
import {
  Sections,
} from '../const.js';

function getItemColSpan(item, section) {
  return section === Sections.FEATURED ? GridView.ColSpan.STRETCH : 1;
}

class ArticlesGridScreen extends ArticlesListScreen {
  static propTypes = {
    ...ArticlesListScreen.propTypes,
    gridColumns: React.PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
  }

  renderArticle(article, style) {
    return (
      <GridArticleView
        article={article}
        style={style.gridColumn}
        onPress={this.openDetailsScreen}
      />
    );
  }

  renderItem(article) {
    const { style } = this.props;
    if (article.featured) {
      return this.renderFeaturedArticle(article);
    }

    return this.renderArticle(article, style);
  }

  renderArticles() {
    const {
      style,
      news,
      gridColumns,
    } = this.props;
    return (
      <GridView
        gridColumns={gridColumns}
        items={news}
        renderGridItem={this.renderItem}
        onRefresh={this.refreshNews}
        status={this.state.fetchStatus}
        style={style.gridView}
        getSectionId={this.getSectionId}
        renderSectionHeader={this.renderSectionHeader}
        getItemColSpan={getItemColSpan}
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
  sectionHeader: {
    [INCLUDE]: ['baseFont'],
    color: '#888888',
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: 12,
  },
  featuredItem: {
    gridBox: {
      container: {
        padding: 5,
        flexDirection: 'column',
        backgroundColor: '#2c2c2c',
      },
      contentWrapper: {
        flexWrap: 'wrap',
        width: null,
        alignItems: 'center',
        justifyContent: 'center',
        height: 330,
        padding: 20,
      },
      backgroundImage: {
        borderRadius: 2,
      },
    },
    headline: {
      width: null,
      height: null,
      alignSelf: 'center',
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
