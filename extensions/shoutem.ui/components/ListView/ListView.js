import React, {
  View,
  ListView,
} from 'react-native';
import _ from 'lodash';
import Search from '../Search/Search';
import GiftedListView from 'react-native-gifted-listview';
import { connectStyle } from 'shoutem/theme';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

function isRefreshable(searchedItems, notRefreshable) {
  return !Boolean(searchedItems.length > 0 || notRefreshable);
}
function createDataSource(searchedItems, items) {
  const itemsToShow = searchedItems.length > 0 ? searchedItems : items;
  return dataSource.cloneWithRows(itemsToShow);
}
class ShoutemListView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleListViewRef = this.handleListViewRef.bind(this);
    this.fetch = this.fetch.bind(this);
    this.searchHidden = false;
    this.listView = null;
    this.state = {
      searchTerm: '',
    };
  }

  /**
   * Used to map props we are passing to GiftedListView from our ListView.
   * Setting default values.
   * @returns {{}}
   */
  getPropsToPass() {
    const props = this.props;
    const mappedProps = _.omit(props, ['style', 'fetch', 'items', 'searchedItems']);

    // Default values
    // display a loader for the first fetching
    mappedProps.firstLoader = Boolean(!props.hideFirstLoader);
    // enable infinite scrolling using touch to load more
    mappedProps.pagination = Boolean(!props.disablePagination);
    // enable pull-to-refresh for iOS and touch-to-refresh for Android
    mappedProps.refreshable = isRefreshable(props.searchedItems, props.notRefreshable);
    // enable sections
    mappedProps.withSections = props.sections;
    // react native warning
    // NOTE: In react 0.23 it can't be set to false
    mappedProps.enableEmptySections = true;
    // handle default onFetch
    mappedProps.onFetch = this.fetch;

    // TODO(Braco) - set by theme?
    mappedProps.refreshableTintColor = 'blue';

    // Mapped properties
    // create headerView function if there is something to render in header
    mappedProps.headerView = this.createHeaderView();
    // we do not want to pass style to GiftedListView, it uses customStyle
    mappedProps.customStyle = props.style.list;
    mappedProps.contentContainerStyle = props.style.listContent;
    // data for list to show
    mappedProps.dataSource = createDataSource(props.searchedItems, props.items);

    return mappedProps;
  }

  /**
   * Handle default ListView search.
   * @param searchTerm
   */
  search(searchTerm) {
    this.setState({
      searchTerm,
    });
    this.fetch();
  }

  /**
   * Called by GiftedListView with (page, callback, options) args.
   * Calls passed fetch to get new items.
   */
  fetch() {
    if (this.props.fetch) {
      this.props.fetch(this.state.searchTerm);
    }
  }

  /**
   * Save RN ListView ref and pass it to parent.
   * Hide search on first load if search is present.
   * @param ref
   */
  handleListViewRef(ref) {
    const props = this.props;

    if (!ref) {
      return;
    }

    if (!this.searchHidden && props.search) {
      // scroll off to hide search only once and only if search enabled
      this.searchHidden = true;
      this.listView = ref.refs.listview;
      this.listView.scrollTo({ y: _.get(props, 'style.header.search.container.height') });
    }

    if (props.registerScrollRef) {
      // pass ref to parent
      props.registerScrollRef(this.listView);
    }
  }

  /**
   * Creates headerView for GiftedListView.
   * Used to prevent header render if nothing in header.
   * @returns {*}
   */
  createHeaderView() {
    const {
      style: listViewStyle,
      renderHeader,
      search,
      searchPlaceholder,
      onSearchCleared,
    } = this.props;
    const style = listViewStyle.header;

    if (!search && !renderHeader) {
      // prevent header rendering if nothing to render
      return undefined;
    }

    const searchComponent = search ?
      (<Search
        style={style.search}
        onSearchTermChange={this.search}
        onCleared={onSearchCleared}
        placeholder={searchPlaceholder}
      />) : null;

    return function headerView() {
      return (<View style={style.container}>
        {searchComponent}
        {renderHeader ? renderHeader() : null }
      </View>);
    };
  }

  render() {
    return (<GiftedListView
      ref={this.handleListViewRef}
      {...this.getPropsToPass()}
    />);
  }
}

ShoutemListView.propTypes = {
  style: React.PropTypes.object,
  search: React.PropTypes.bool,
  searchPlaceholder: React.PropTypes.string,
  onSearchCleared: React.PropTypes.func,
  notRefreshable: React.PropTypes.bool,
  disablePagination: React.PropTypes.bool,
  hideFirstLoader: React.PropTypes.bool,
  sections: React.PropTypes.bool,
  renderRow: React.PropTypes.func,
  registerScrollRef: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  fetch: React.PropTypes.func,
  items: React.PropTypes.array,
  searchedItems: React.PropTypes.array,
  onEndReach: React.PropTypes.func, // TODO(Braco) - enable real infinite scrolling
};

const style = {
  header: {
    container: {},
    search: {},
  },
  list: {},
};

export default connectStyle('shoutem.ui.ListView', style)(ShoutemListView);
