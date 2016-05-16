import React, {
  View,
  Component,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem, AdvancedListView } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import ListScreenPropTypes from './lib/ListScreenPropTypes';
import newsMapStateToProps from './lib/newsMapStateToProps';
import NewsCategoriesDropDownMenu from '../components/NewsCategoriesDropDownMenu';
import isSearch from './lib/isSearch';
import fetchNews from './lib/fetchNews';
import _ from 'lodash';

function renderRow(item, style, extrasSeparator, onPress) {
  if (item.featured) {
    return (
      <TouchableOpacity onPress={() => { onPress.apply(null, [item]); }}>
        <NewsGridBox
          backgroundImage={{ uri: _.get(item, 'image.url') }}
          headline={item.title.toUpperCase()}
          infoFields={['News', 'Sprint 6']}
          style={style.featuredItem}
        />
      </TouchableOpacity>
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

    function renderListRow(item) {
      return renderRow(item, style, undefined, openDetailsScreen);
    }

    const itemsList = selectedCategory ? (
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
      />) : null;

    return (
      <View style={style.screen}>
        {itemsList}
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

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.ListScreen', style)(ListScreen)
);
