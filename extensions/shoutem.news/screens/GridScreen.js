import React, {
  View,
  Component,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItem, AdvancedListView, DropDownMenu } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import newsMapStateToProps from './lib/newsMapStateToProps';

const DEFAULT_ITEMS_GROUP_SIZE = 2;

function renderRow(items, style, extrasSeparator, onPress) {
  return (
    <View style={style.gridRow}>
      {
        items.reduce((gridItems, item) => {
          gridItems.puhs(
            <ListItem
              description={item.attributes.title}
              image={{ uri: item.image_url }}
              leftExtra={'News'}
              id={item.id}
              style={style.gridColumn}
              onPressItem={{ body: item.attributes.body, title: item.attributes.title }}
              onPressMethod={onPress}
            />
          );
          return gridItems;
        }, [])
      }
    </View>);
}

function groupItems(items, itemsPerGroup = DEFAULT_ITEMS_GROUP_SIZE) {
  return items.reduce((groupedItems, item, index) => {
    if (index % itemsPerGroup === 0) {
      groupedItems.push([]);
    }
    groupedItems[(groupedItems.length - 1)].push(item);
    return groupedItems;
  }, []);
}

class GridScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetch = this.fetch.bind(this);
    this.onSearchCleared = this.onSearchCleared.bind(this);
  }

  onSearchCleared() {
    this.props.clearSearch();
  }

  fetch(searchTerm) {
    this.props.findNews(searchTerm);
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
    const groupedItems = groupItems((searchedNews.length > 0 ? searchedNews : news), gridColumns);


    const categoryDropDown = (
      <DropDownMenu
        items={[{ name: 'World', id: 1 }, { name: 'Sport', id: 2 }, { name: 'Music', id: 3 }]}
        bindings={{ text: 'name', value: 'id' }}
      />
    );
    setNavBarProps({
      rightComponent: categoryDropDown,
    });

    function openDetailsScreen(item) {
      const route = { screen: 'shoutem.news.DetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderGridRow(item) {
      return renderRow(item, style, undefined, openDetailsScreen);
    }

    return (
      <View style={style.screen}>
        <AdvancedListView
          items={groupedItems}
          search
          onSearchCleared={this.onSearchCleared}
          fetch={this.fetch}
          renderRow={renderGridRow}
          style={style.listView}
        />
      </View>
    );
  }
}

GridScreen.propTypes = {
  gridColumns: React.PropTypes.number,
  findNews: React.PropTypes.func,
  clearSearch: React.PropTypes.func,
  news: React.PropTypes.array,
  searchedNews: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};

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
  gridRow: {},
  gridColumn: {
    [INCLUDE]: ['shoutem.ui.ListItem.photoCentric'],
  },
};

export default connect(newsMapStateToProps, newsMapDispatchToProps)(
  connectStyle('shoutem.news.GridScreen', style)(GridScreen)
);
