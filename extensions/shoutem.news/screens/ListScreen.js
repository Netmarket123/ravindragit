import React, {
  View,
  Component,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { NewsGridBox, ListItem, AdvancedListView, DropDownMenu } from 'shoutem.ui';
import newsMapDispatchToProps from './lib/newsMapDispatchToProps';
import ListScreenPropTypes from './lib/ListScreenPropTypes';
import newsMapStateToProps from './lib/newsMapStateToProps';

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
      description={item.attributes.title}
      image={{ uri: item.image_url }}
      leftExtra={'News'}
      id={item.id}
      style={style.items}
      onPressItem={{ body: item.attributes.body, title: item.attributes.title }}
      onPressMethod={onPress}
    />
  );
}

class ListScreen extends Component {
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
    } = this.props;

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
          items={searchedNews.length > 0 ? searchedNews : news}
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
