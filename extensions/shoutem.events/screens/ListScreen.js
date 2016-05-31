import React, {
  View,
  Component,
  Text,
} from 'react-native';
import { ReduxApiStateDenormalizer, isBusy } from '@shoutem/redux-api-state';
import { SHOUTEM_EVENTS_EXT_NAME } from '../index';
import {
  SHOUTEM_EVENTS_SCHEME,
  SHOUTEM_CATEGORIES_SCHEME,
  schemasMap,
} from '../actions';
import { connect } from 'react-redux';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import { ListItemButton, ListView, ShoutemIconButton, DropDownMenu } from 'shoutem.ui';
import eventsMapDispatchToProps from './lib/eventsMapDispatchToProps';
import { toMoment, addToCalendar } from './lib/Calendar';
import EventsCategoriesDropdownMenu from '../components/EventsCategoriesDropDownMenu';

const Status = ListView.Status;
class DenormalizeService {
  constructor() {
    this.denormalizeInstance = null;
  }

  createNewInstance(state) {
    this.denormalizeInstance = new ReduxApiStateDenormalizer(() => state, schemasMap);
  }

  get() {
    return this.denormalizeInstance;
  }
}
const denormalizeService = new DenormalizeService();

function formatDate(date) {
  if (!date) {
    return '';
  }

  return toMoment(date).format('MMMM D • hh:mm');
}

function renderRow(item, style, extrasSeparator, onPress) {
  function onButtonPressed() {
    addToCalendar(item);
  }

  function renderButton() {
    return (
      <ShoutemIconButton
        iconName="add-to-calendar"
        style={style.addToCalendarButton}
        showIconOnRight={false}
        onPress={onButtonPressed}
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
        renderButton={renderButton}
        fallbackImage={require('../assets/images/image-fallback.png')}
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
      events: [],
      categories: [],
    };
  }

  componentWillMount() {
    const {
      fetchEventsCategories,
      settings,
      categoriesCollection,
      eventsCollection,
    } = this.props;

    if (settings.categoryIds && settings.categoryIds.length > 0) {
      this.setState({ fetchStatus: Status.LOADING }, this.fetchEvents);
    } else if (categoriesCollection.length === 0) {
      this.setState(
        { fetchStatus: Status.LOADING },
        () => fetchEventsCategories(settings.parentCategoryId, settings)
      );
    }

    if (categoriesCollection.length > 0) {
      const categories = this.denormalizeCategories(categoriesCollection);
      this.setState({ selectedCategory: categories[0] });
    }

    if (eventsCollection.length > 0) {
      this.denormalizeEvents(eventsCollection);
    }

  }

  shouldComponentUpdate(nextProps) {
    if (nextProps === this.props) {
      return false;
    }
    const eventsBusy = isBusy(nextProps.eventsCollection);
    const categoriesBusy = isBusy(nextProps.categoriesCollection);
    if (eventsBusy || categoriesBusy) {
      return false;
    }
    const updateNews =
      !eventsBusy &&
      nextProps.eventsCollection !== this.props.eventsCollection;

    const updateCategories =
      !categoriesBusy &&
      nextProps.categoriesCollection !== this.props.categoriesCollection;

    if (updateNews) {
      this.denormalizeEvents(nextProps.eventsCollection);
    }

    if (updateCategories) {
      this.denormalizeCategories(nextProps.categoriesCollection);
    }
    return true;
  }

  denormalizeCategories(categoriesCollection) {
    const denormalizer = denormalizeService.get();
    const categories = denormalizer.denormalizeCollection(
      categoriesCollection, SHOUTEM_CATEGORIES_SCHEME
    );
    this.setState({ categories });
    return categories;
  }

  denormalizeEvents(eventsCollection) {
    const denormalizer = denormalizeService.get();
    const events = denormalizer.denormalizeCollection(
      eventsCollection, SHOUTEM_EVENTS_SCHEME
    );
    this.setState({ events });
    return events;
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
      navigateToRoute,
    } = this.props;
    const { events } = this.state;

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
    } = this.props;
    const { selectedCategory, categories, events } = this.state;

    const categorySelector = (
      <View style={style.categorySelector}>
        <EventsCategoriesDropdownMenu
          categories={categories}
          categorySelected={this.categorySelected}
          selectedCategory={selectedCategory}
        />
      </View>
    );

    setNavBarProps({
      centerComponent: (
        <Text style={style.navigation.navigationBarTitle}>EVENTS</Text>
      ),
    });

    return (
      <View style={style.screen}>
        {categories.length > 0 ? categorySelector : null}
        {events.length > 0 ? this.renderEvents() : null}
      </View>
    );
  }
}

ListScreen.propTypes = {
  settings: React.PropTypes.object,
  selectedCategory: React.PropTypes.object,
  findEvents: React.PropTypes.func,
  fetchEventsCategories: React.PropTypes.func,
  categoriesCollection: React.PropTypes.array,
  eventsCollection: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};

const style = {
  listView: {
    header: {
      container: {},
      search: {},
    },
    list: {},
    listContent: {},
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
  navigation: {
    navigationBarTitle: {
      [INCLUDE]: ['navigationBarTextColor'],
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
    paddingVertical: 11,
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
  },
};


function eventsMapStateToProps(state) {
  denormalizeService.createNewInstance(state, schemasMap);
  return {
    selectedCategory: state[SHOUTEM_EVENTS_EXT_NAME].selectedCategory,
    eventsCollection: state[SHOUTEM_EVENTS_EXT_NAME].latestEvents,
    categoriesCollection: state[SHOUTEM_EVENTS_EXT_NAME].eventsCategories,
  };
}

export default connect(eventsMapStateToProps, eventsMapDispatchToProps)(
  connectStyle('shoutem.events.ListScreen', style)(ListScreen)
);
