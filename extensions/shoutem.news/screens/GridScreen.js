import React, {
  View,
  Component,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItem, AdvancedGridView } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import newsMapStateToProps from './lib/newsMapStateToProps';
import ListScreenPropTypes from './lib/ListScreenPropTypes';
import NewsCategoriesDropDownMenu from '../components/NewsCategoriesDropDownMenu';
import isSearch from './lib/isSearch';
import fetchNews from './lib/fetchNews';
import _ from 'lodash';

function renderNewsItem(item, style, extrasSeparator, onPress) {
  return (
    <ListItem
      key={item.id}
      description={item.title}
      image={{ uri: _.get(item, 'image.url') }}
      leftExtra={'News'}
      id={item.id}
      style={style.gridColumn}
      onPressItem={item}
      onPressMethod={onPress}
    />
  );
}

class GridScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetch = fetchNews.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.state = {
      searchTerm: '',
      selectedCategory: null,
    };
  }

  onSearchChanged(searchTerm) {
    this.setState({ searchTerm });
  }

  categorySelected(category) {
    this.setState({ selectedCategory: category });
  }
  render() {
    const {
      style,
      setNavBarProps,
      navigateToRoute,
      news,
      searchedNews,
      gridColumns,
      settings: { parentCategoryId },
      settings,
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;
    const showSearchResults = isSearch(searchTerm);

    setNavBarProps({
      rightComponent: (<NewsCategoriesDropDownMenu
        settings={settings}
        parentCategoryId={parentCategoryId}
        categorySelected={this.categorySelected}
        selectedCategory={selectedCategory}
      />),
    });

    function openDetailsScreen(item) {
      const route = { screen: 'shoutem.news.DetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderGridItem(item) {
      return renderNewsItem(item, style, undefined, openDetailsScreen);
    }

    const itemsList = selectedCategory ? (
      <AdvancedGridView
        items={showSearchResults ? searchedNews : news}
        gridColumns={gridColumns}
        search
        infiniteScrolling
        notRefreshable={showSearchResults}
        onSearchTermChanged={this.onSearchChanged}
        queryParams={{ searchTerm, selectedCategory }}
        fetch={this.fetch}
        renderGridItem={renderGridItem}
        style={style.gridView}
      />) : null;

    return (
      <View style={style.screen}>
        {itemsList}
      </View>
    );
  }
}

GridScreen.propTypes = Object.assign({}, ListScreenPropTypes, {
  gridColumns: React.PropTypes.number,
});

const style = {
  gridView: {
    header: {
      container: {
      },
      search: {
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
    listContent: {
    },
    gridRow: {
      paddingRight: 5,
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
