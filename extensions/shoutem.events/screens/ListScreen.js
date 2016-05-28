import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItemButton, ListView, MaterialIconButton } from 'shoutem.ui';
import eventsMapDispatchToProps from './lib/eventsMapDispatchToProps';
import eventsMapStateToProps from './lib/eventsMapStateToProps';
import EventsCategoriesDropdownMenu from '../components/EventsCategoriesDropDownMenu';
import moment from 'moment';

const Status = ListView.Status;

function formatDate(date) {
  return moment(date, 'YYYY-MM-DDThh:mm:ss').format('MMMM D • hh:mm');
}

function renderRow(item, style, extrasSeparator, onPress) {
  function renderButton() {
    return (
      <MaterialIconButton
        iconName="event-note"
        style={style.addToCalendarButton}
        showIconOnRight={false}
        onPress={() => console.warn('pressed')}
      />
    );
  }

  return (
    <View>
      <ListItemButton
        description={item.title}
        image={item.image}
        leftExtra={formatDate(item.startTime)}
        id={item.id}
        style={style.listRow}
        onPress={onPress}
        buttonIcon={"event-note"}
        renderButton={renderButton}
      />
    </View>
  );
}

class ListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.setState = this.setState.bind(this);
    this.refreshEvents = this.refreshEvents.bind(this);
    this.state = {
      selectedCategory: null,
      fetchStatus: null,
    };
  }

  componentWillMount() {
    const {
      fetchEventsCategories,
      settings,
    } = this.props;

    if (settings.categoryIds && settings.categoryIds.length > 0) {
      this.setState({ fetchStatus: Status.LOADING }, this.fetchEvents);
    } else {
      this.setState(
        { fetchStatus: Status.LOADING },
        () => fetchEventsCategories(settings.parentCategoryId, settings)
      );
    }
  }

  fetchEvents() {
    const { settings, findEvents } = this.props;
    const { selectedCategory } = this.state;

    const categories = settings.categoryIds ? settings.categoryIds : [selectedCategory.id];

    findEvents(categories, settings).then(() => {
      this.setState({ fetchStatus: Status.IDLE });
    });
  }

  categorySelected(category) {
    this.setState(
      {
        selectedCategory: category,
        fetchStatus: Status.LOADING,
      },
      this.fetchEvents
    );
  }

  refreshEvents() {
    this.setState({ fetchStatus: Status.REFRESHING }, this.fetchEvents);
  }

  renderEvents() {
    const {
      style,
      events,
      navigateToRoute,
    } = this.props;

    function renderListRow(item) {
      function openDetailsScreen() {
        const route = { screen: 'shoutem.events.DetailsScreen', props: { item } };
        navigateToRoute(route);
      }
      return renderRow(item, style, undefined, openDetailsScreen);
    }

    function convertCmsEventToItem(event) {
      const imageUrl = (event.image && event.image.url) ? event.image.url : undefined;

      return {
        id: event.id,
        title: event.name,
        rsvplink: event.rsvplink,
        information: event.description,
        startTime: event.starttime,
        endTime: event.endtime,
        image: { uri: imageUrl },
      };
    }

    return (
      <ListView
        items={events.map(convertCmsEventToItem)}
        renderRow={renderListRow}
        status={this.state.fetchStatus}
        style={style.listView}
        getSectionId={this.getSectionId}
        onRefresh={this.refreshEvents}
        renderSectionHeader={this.renderSectionHeader}
      />
    );
  }

  render() {
    const {
      style,
      setNavBarProps,
      settings: { parentCategoryId },
      settings,
    } = this.props;
    const { selectedCategory } = this.state;

    const dropDownMenu = (
      <EventsCategoriesDropdownMenu
        settings={settings}
        parentCategoryId={parentCategoryId}
        categorySelected={this.categorySelected}
        selectedCategory={selectedCategory}
      />
    );

    const categorySelector = (
      <View style={style.categorySelector}>
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

    return (
      <View style={style.screen}>
        {categorySelector}
        {this.renderEvents()}
      </View>
    );
  }
}

ListScreen.propTypes = {
  settings: React.PropTypes.object,
  selectedCategory: React.PropTypes.object,
  findEvents: React.PropTypes.func,
  fetchEventsCategories: React.PropTypes.func,
  events: React.PropTypes.array,
  categories: React.PropTypes.array,
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
  },
  addToCalendarButton: {
    buttonContainer: {
      backgroundColor: '#fff',
    },
    button: {
      paddingLeft: 15,
      paddingVertical: 9,
    },
    buttonIcon: {
      color: '#333333',
      fontSize: 24,
    },
  },
  categorySelector: {
    height: 40,
  },
};

export default connect(eventsMapStateToProps, eventsMapDispatchToProps)(
  connectStyle('shoutem.events.ListScreen', style)(ListScreen)
);
