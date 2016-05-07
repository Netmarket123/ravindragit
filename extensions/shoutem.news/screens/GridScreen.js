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
    this.fetch = this.fetch.bind(this);
    this.onSearchCleared = this.onSearchCleared.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.state = {
      searchTerm: '',
    };
  }

  onSearchChanged(searchTerm) {
    this.setState({ searchTerm });
  }

  onSearchCleared() {
    this.props.clearSearch();
  }

  fetch(queryParams) {
    this.props.findNews(queryParams.searchTerm, queryParams.selectedCategory);
  }

  render() {
    const {
      style,
      setNavBarProps,
      navigateToRoute,
      news,
      searchedNews,
      gridColumns,
      selectedCategory,
    } = this.props;
    const searchTerm = this.state.searchTerm;
    const showSearchResults = isSearch(searchTerm, selectedCategory);


    setNavBarProps({
      rightComponent: <NewsCategoriesDropDownMenu />,
    });

    function openDetailsScreen(item) {
      const route = { screen: 'shoutem.news.DetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderGridItem(item) {
      return renderNewsItem(item, style, undefined, openDetailsScreen);
    }

    return (
      <View style={style.screen}>
        <AdvancedGridView
          items={showSearchResults ? searchedNews : news}
          gridColumns={gridColumns}
          search
          notRefreshable={showSearchResults}
          onSearchCleared={this.onSearchCleared}
          onSearchTermChanged={this.onSearchChanged}
          queryParams={{ searchTerm, selectedCategory }}
          fetch={this.fetch}
          renderGridItem={renderGridItem}
          style={style.gridView}
        />
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
        paddingTop: 10,
        marginTop: 10,
      },
      actionsLabel: {
        background: 'red',
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
