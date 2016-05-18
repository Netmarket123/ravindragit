import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItem, AdvancedListView } from 'shoutem.ui';
import eventsMapDispatchToProps from './lib/eventsMapDispatchToProps';
import eventsMapStateToProps from './lib/eventsMapStateToProps';
import EventsCategoriesDropdownMenu from '../components/EventsCategoriesDropDownMenu';
import fetchEvents from './lib/fetchEvents';
import _ from 'lodash';
import moment from 'moment';

function formatDate(date) {
  return moment(date, 'YYYY-MM-DDThh:mm:ss').format('MMMM D • hh:mm');
}

function renderRow(item, style, extrasSeparator, onPress) {
  return (
    <View>
      <ListItem
        description={item.title}
        image={item.image}
        leftExtra={formatDate(item.startTime)}
        id={item.id}
        style={style.listRow}
        onPressItem={item}
        onPressMethod={onPress}
        buttonIcon={"event-note"}
        onButtonPressed={() => console.warn('pressed')}
      />
    </View>
  );
}

class ListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetch = fetchEvents.bind(this);
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
      events,
      setNavBarProps,
      navigateToRoute,
      settings: { parentCategoryId },
      settings,
    } = this.props;
    const { searchTerm, selectedCategory } = this.state;

    const dropDownMenu = (
      <EventsCategoriesDropdownMenu
        settings={settings}
        parentCategoryId={parentCategoryId}
        categorySelected={this.categorySelected}
        selectedCategory={selectedCategory}
      />
    );

    const categorySelector = (
      <View style={{ height: 40 }}>
        {dropDownMenu}
      </View>
    );

    setNavBarProps({
      centerComponent: (
        <Text>EVENTS</Text>
      ),
      rightComponent: (
        <Text>Map</Text>
      ),
    });

    function openDetailsScreen(item) {
      const route = { screen: 'shoutem.events.DetailsScreen', props: { item } };
      navigateToRoute(route);
    }

    function renderListRow(item) {
      return renderRow(item, style, undefined, openDetailsScreen);
    }

    function convertCmsEventToItem(event) {
      const imageUrl = (event.image && event.image.url) ? event.image.url : undefined;

      return {
        title: event.name,
        information: event.description,
        startTime: event.starttime,
        endTime: event.endtime,
        image: { uri: imageUrl },
      };
    }

    const itemsList = selectedCategory ? (
      <AdvancedListView
        items={events.map(convertCmsEventToItem)}
        search
        infiniteScrolling
        onSearchTermChanged={this.onSearchChanged}
        queryParams={{ searchTerm, selectedCategory }}
        fetch={this.fetch}
        renderRow={renderListRow}
        style={style.listView}
      />) : null;

    return (
      <View style={style.screen}>
        {categorySelector}
        {itemsList}
      </View>
    );
  }
}

ListScreen.propTypes = {
  settings: React.PropTypes.object,
  findEvents: React.PropTypes.func,
  clearSearch: React.PropTypes.func,
  events: React.PropTypes.array,
  searchedEvents: React.PropTypes.array,
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
    mediumListItemButton: {
      buttonContainer: {
        backgroundColor: '#fff',
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingVertical: 9,
      },
      buttonIcon: {
        color: '#333333',
        fontSize: 24,
      },
    },
  },
};

export default connect(eventsMapStateToProps, eventsMapDispatchToProps)(
  connectStyle('shoutem.events.ListScreen', style)(ListScreen)
);
