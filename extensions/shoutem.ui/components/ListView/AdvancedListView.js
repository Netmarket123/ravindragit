import React, {
  View,
} from 'react-native';
import _ from 'lodash';
import Search from '../Search/Search';
import GiftedListView from 'react-native-gifted-listview';
import { connectStyle } from 'shoutem/theme';

const GET_PROPS_TO_PASS = Symbol('getPropsToPass');
const HANDLE_LIST_VIEW_REF = Symbol('handleListViewRef');

function isRefreshable(searchTerm, notRefreshable) {
  return !(searchTerm || notRefreshable);
}

class AdvancedListView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this[HANDLE_LIST_VIEW_REF] = this[HANDLE_LIST_VIEW_REF].bind(this);
    this.fetch = this.fetch.bind(this);
    this.search = this.search.bind(this);
    this.searchHidden = false;
    this.listView = null;
    this.giftedListView = null;
    this.state = {
      searchTerm: '',
    };
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (this.giftedListView && nextProps.items !== items) {
      // GiftedListView use _updateRows to handle data to show and update internal state
      // such as loading status and other.
      // Second argument (options) can be passed to mark last page and things like that.
      // This function is used here so we do not need to implement callback onFetch method
      // and work with callbacks as GiftedListView does
      // https://github.com/FaridSafi/react-native-gifted-listview/blob/master/GiftedListViewExample/example_simple.js#L26
      this.giftedListView._updateRows(nextProps.items);
    }
    return true;
  }

  /**
   * Used to map props we are passing to GiftedListView from our ListView.
   * Setting default values.
   * @returns {{}}
   */
  [GET_PROPS_TO_PASS]() {
    const props = this.props;
    // TODO(Braco) - optimise omit/pick
    const mappedProps = _.omit(props, ['style', 'fetch', 'items', 'searchedItems']);

    // Default values
    // display a loader for the first fetching
    mappedProps.firstLoader = Boolean(!props.hideFirstLoader);
    // enable infinite scrolling using touch to load more
    mappedProps.pagination = Boolean(!props.disablePagination);
    // enable pull-to-refresh for iOS and touch-to-refresh for Android
    mappedProps.refreshable = isRefreshable(this.state.searchTerm, props.notRefreshable);
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
   * Save RN ListView GiftedListViewRef and pass it to parent.
   * Hide search on first load if search is present.
   * @param GiftedListViewRef
   */
  [HANDLE_LIST_VIEW_REF](GiftedListViewRef) {
    const props = this.props;

    if (!GiftedListViewRef) {
      return;
    }

    this.giftedListView = GiftedListViewRef;
    this.listView = GiftedListViewRef.refs.listview;

    if (!this.searchHidden && props.search) {
      // scroll off to hide search only once and only if search enabled
      this.searchHidden = true;
      this.listView.scrollTo({ y: _.get(props, 'style.header.search.container.height') });
    }

    if (props.registerScrollRef) {
      // pass GiftedListViewRef to parent
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
      ref={this[HANDLE_LIST_VIEW_REF]}
      {...this[GET_PROPS_TO_PASS]()}
    />);
  }
}

AdvancedListView.propTypes = {
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
  onEndReach: React.PropTypes.func, // TODO(Braco) - enable real infinite scrolling
};

const style = {
  header: {
    container: {},
    search: {},
  },
  list: {},
};

export default connectStyle('shoutem.ui.AdvancedListView', style)(AdvancedListView);
