import React, {
  View,
  Component,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem, AdvancedListView } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import ListScreenPropTypes from './lib/ListScreenPropTypes';
import newsMapStateToProps from './lib/newsMapStateToProps';
import NewsCategoriesDropDownMenu from '../components/NewsCategoriesDropDownMenu';
import isSearch from './lib/isSearch';
import _ from 'lodash';

function renderRow(item, style, extrasSeparator, onPress) {
  if (item.featured) {
    return (
      <NewsGridBox
        backgroundImage={item.image}
        headline={item.description.toUpperCase()}
        infoFields={[item.source, item.date]}
        style={style.featuredItem}
      />
    );
  }

  return (
    <ListItem
      description={item.title}
      image={{ uri: _.get(item, 'image.url') }}
      leftExtra={'News'}
      id={item.id}
      style={style.listRow}
      onPressItem={item}
      onPressMethod={onPress}
    />
  );
}

class ListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetch = this.fetch.bind(this);
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

  fetch(queryParams, isLoadMore) {
    let offset;
    if (
      !isSearch(queryParams.searchTerm, queryParams.selectedCategory) &&
      this.props.searchedNews.length > 0
    ) {
      this.props.clearSearch();
    }

    if (isLoadMore) {
      offset = 1;
    }

    if (isLoadMore) {
      return undefined;
    }

    return this.props.findNews(queryParams.searchTerm, queryParams.selectedCategory, offset);
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
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;
    const showSearchResults = isSearch(searchTerm, selectedCategory);

    setNavBarProps({
      rightComponent: (<NewsCategoriesDropDownMenu
        categorySelected={this.categorySelected}
        selectedCategory={selectedCategory}
      />),
    });

    function openDetailsScreen(item) {
      const route = { screen: 'shoutem.news.DetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderListRow(item) {
      return renderRow(item, style, undefined, openDetailsScreen);
    }

    return (
      <View style={style.screen}>
        <AdvancedListView
          items={showSearchResults ? searchedNews : news}
          search
          infiniteScrolling
          notRefreshable={showSearchResults}
          onSearchTermChanged={this.onSearchChanged}
          queryParams={{ searchTerm, selectedCategory }}
          fetch={this.fetch}
          renderRow={renderListRow}
          style={style.listView}
        />
      </View>
    );
  }
}

ListScreen.propTypes = ListScreenPropTypes;

const style = {
  listView: {
    header: {
      container: {
      },
      search: {
      },
    },
    list: {
    },
    listContent: {
    },
  },
  screen: {},
  featuredItem: {},
  listRow: {
    [INCLUDE]: ['shoutem.ui.ListItem.textCentric'],
  },
};

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ListScreen)
);
