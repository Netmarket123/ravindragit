import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItem, AdvancedGridView } from 'shoutem.ui';
import eventsMapDispatchToProps from './lib/eventsMapDispatchToProps';
import eventsMapStateToProps from './lib/eventsMapStateToProps';
import EventsCategoriesDropdownMenu from '../components/EventsCategoriesDropDownMenu';
import moment from 'moment';

function toMoment(date) {
  return moment(date, 'YYYY-MM-DDThh:mm:ss');
}

function formatDate(date) {
  return toMoment(date).format('MMMM D • hh:mm');
}

function renderEventItem(item, style, extrasSeparator, onPress) {
  function onButtonPressed() {
    const fromDate = toMoment(item.startTime);
    const toDate = item.endtime ? toMoment(item.endtime)
                                : fromDate.clone().add(1, 'hours');
    console.warn(item.title, fromDate.valueOf(), toDate.valueOf());
  }

  return (
    <ListItem
      key={item.id}
      description={item.title}
      image={item.image}
      leftExtra={formatDate(item.startTime)}
      id={item.id}
      style={style.gridColumn}
      onPressItem={item}
      onPressMethod={onPress}
      buttonIcon={"event-note"}
      onButtonPressed={onButtonPressed}
    />
  );
}

class GridScreen extends Component {
  constructor(props, context) {
    super(props, context);
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
      events,
      gridColumns,
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
      <View style={{ height: 35, backgroundColor: 'transparent' }}>
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

    function renderGridItem(item) {
      return renderEventItem(item, style, undefined, openDetailsScreen);
    }

    function convertCmsEventToItem(event) {
      const imageUrl = (event.image && event.image.url) ? event.image.url : undefined;

      return {
        id: event.id,
        title: event.name,
        information: event.description,
        startTime: event.starttime,
        endTime: event.endtime,
        image: { uri: imageUrl },
      };
    }

    const itemsList = selectedCategory ? (
      <AdvancedGridView
        items={events.map(convertCmsEventToItem)}
        gridColumns={gridColumns}
        infiniteScrolling
        onSearchTermChanged={this.onSearchChanged}
        queryParams={{ searchTerm, selectedCategory }}
        fetch={this.fetch}
        renderGridItem={renderGridItem}
        style={style.gridView}
      />) : null;

    return (
      <View style={style.screen}>
        {categorySelector}
        {itemsList}
      </View>
    );
  }
}

GridScreen.propTypes = {
  settings: React.PropTypes.object,
  findEvents: React.PropTypes.func,
  events: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
  gridColumns: React.PropTypes.number,
};

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
    mediumListItemButton: {
      buttonContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 50,
        right: 0,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
      },
      buttonIcon: {
        color: '#fff',
        fontSize: 24,
      },
    },
  },
};

export default connect(eventsMapStateToProps, eventsMapDispatchToProps)(
  connectStyle('shoutem.events.GridScreen', style)(GridScreen)
);
