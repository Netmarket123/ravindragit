import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItem, AdvancedListView } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import ListScreenPropTypes from './lib/ListScreenPropTypes';
import newsMapStateToProps from './lib/newsMapStateToProps';
import renderCategoriesDropDown from './lib/renderNewsCategoriesDropDownMenu';
import isSearch from './lib/isSearch';
import fetchNews from './lib/fetchNews';
import renderFeaturedItem from './lib/renderFeaturedItem';
import _ from 'lodash';
import moment from 'moment';

class ListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    props.getNewsCategories(props.parentCategoryId, props.settings);
    this.fetch = fetchNews.bind(this);
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

  renderRow(item) {
    const { style } = this.props;
    if (item.featured) {
      return renderFeaturedItem(item, style, () => this.openDetailsScreen(item));
    }

    return (
      <ListItem
        description={item.title}
        image={{ uri: _.get(item, 'image.url') }}
        leftExtra={moment(item.timeUpdated).fromNow()}
        id={item.id}
        style={style.listRow}
        onPressItem={item}
        onPressMethod={this.openDetailsScreen}
      />
    );
  }

  render() {
    const {
      style,
      setNavBarProps,
      news,
      searchedNews,
      categories,
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;
    const showSearchResults = isSearch(searchTerm);

    setNavBarProps({
      rightComponent:
        renderCategoriesDropDown(
          categories, selectedCategory, this.categorySelected, style.categoriesDropDown
        ),
      centerComponent: (<Text style={style.navBarTitle}>News</Text>),
      style: style.navigationBar,
    });

    const itemsList = selectedCategory ? (
      <AdvancedListView
        items={showSearchResults ? searchedNews : news}
        search
        infiniteScrolling
        notRefreshable={showSearchResults}
        onSearchTermChanged={this.onSearchChanged}
        queryParams={{ searchTerm, selectedCategory }}
        fetch={this.fetch}
        renderRow={this.renderRow}
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
      container: {
      },
      search: {
        container: {
          backgroundColor: '#2c2c2c',
        },
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
