import React, {
  View,
} from 'react-native';
import _ from 'lodash';
import Search from '../Search/Search';
import GiftedListView from 'react-native-gifted-listview';
import { connectStyle } from 'shoutem/theme';
import { FullScreenSpinner, PlatformSpinner } from 'shoutem.ui';

const GET_PROPS_TO_PASS = Symbol('getPropsToPass');
const HANDLE_LIST_VIEW_REF = Symbol('handleListViewRef');
const LOAD_MORE = Symbol('loadMore');
const REFRESH = Symbol('refresh');
const NEW_REQUEST = Symbol('newRequest');

class AdvancedListView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this[HANDLE_LIST_VIEW_REF] = this[HANDLE_LIST_VIEW_REF].bind(this);
    this.fetch = this.fetch.bind(this);
    this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.searchHidden = false;
    this.listView = null;
    this.giftedListView = null;
    this.state = {
      fetchStatus: {
        requestNumber: 0, // Maybe only did request ?
        fetching: false,
        type: undefined,
      },
      noMoreItems: false,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { items, queryParams } = this.props;
    if (this.giftedListView && nextProps.items !== items) {
      // GiftedListView use _updateRows to handle data to show and update internal state
      // such as loading status and other.
      // Second argument (options) can be passed to mark last page and things like that.
      // This function is used here so we do not need to implement callback onFetch method
      // and work with callbacks as GiftedListView does
      // https://github.com/FaridSafi/react-native-gifted-listview/blob/master/GiftedListViewExample/example_simple.js#L26
      this.giftedListView._updateRows(nextProps.items);
    }
    if (!_.eq(nextProps.queryParams, queryParams)) {
      // Compare current query params and new, if different make new request
      // QueryParams can be changed from outside
      this.fetch(undefined, undefined, nextProps.queryParams);
    }
    return true;
  }

  onSearchTermChanged(searchTerm) {
    if (this.props.onSearchTermChanged) {
      this.props.onSearchTermChanged(searchTerm);
    }
  }

  /**
   * Triggered when list end threshold reached (scrolled to)
   */
  onEndReached() {
    if (this.props.onEndReached) {
      this.props.onEndReached();
      return;
    }
    if (this.props.infiniteScrolling) {
      this.loadMore();
    }
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
    mappedProps.refreshable = !props.notRefreshable;
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
    mappedProps.customStyles = props.style.list;
    mappedProps.contentContainerStyle = props.style.listContent;
    // Override GiftedListView renderFooter
    mappedProps.renderFooter = this.renderFooter;
    // Default load more threshold
    mappedProps.onEndReachedThreshold = props.onEndReachedThreshold || 40;
    // Handle on scroll end reach
    mappedProps.onEndReached = this.state.noMoreItems ? null : this.onEndReached;

    return mappedProps;
  }

  /**
   * Identify request type
   * REFRESH - pull to refresh
   * LOAD_more - load next items
   * NEW_REQUEST - first load or query params changed
   *
   * @param isLoadMore
   * @param giftedListViewRef
   * @returns {Symbol}
   */
  detectRequestType(isLoadMore, giftedListViewRef) {
    if (isLoadMore) {
      return LOAD_MORE;
    } else if (giftedListViewRef && giftedListViewRef.state.isRefreshing) {
      return REFRESH;
    }
    return NEW_REQUEST;
  }

  /**
   * Updates fetch status
   *
   * @param fetching - if fetching new data
   * @param isLoadMore - if loading more (pagination)
   */
  handleRequestStatus(fetching, isLoadMore) {
    // update request number if not load more (request changed)
    // else increase requestNumber
    const newRequestNumber = isLoadMore ? this.state.fetchStatus.requestNumber + 1 : 1;
    this.setState({
      noMoreItems: false,
      fetchStatus: {
        requestNumber: newRequestNumber,
        fetching,
        type: this.detectRequestType(isLoadMore, this.giftedListView),
      },
    });
  }

  /**
   * Called by GiftedListView with (page, callback, options) args.
   * Calls passed fetch to get new items.
   * By default props.queryParams are used,
   * in case queryParams change they are passed from nextProps.
   *
   * If fetch returns promise it will be used to notify user.
   * TODO(Braco) - support collection busy as other mode for notifying user of loading.
   * Detect if isLoadMore or new data.
   */
  fetch(page, callback, queryParams = this.props.queryParams, isLoadMore) {
    if (this.props.fetch) {
      const request = this.props.fetch(queryParams || {}, isLoadMore);
      // TODO(Braco) - implement RAS mode without promise
      if (request) {
        // Request is promise
        this.handleRequestStatus(true, isLoadMore);
        request.then(() => {
          this.handleRequestStatus(false, isLoadMore);
        });
      } else {
        // Request undefined means end is reached
        this.setState({
          noMoreItems: true,
        });
      }
    }
  }

  /**
   * Used to load more data.
   * It is called always.
   */
  loadMore() {
    const { requestNumber, fetching } = this.state.fetchStatus;
    if (requestNumber > 0 && !fetching && this.props.items.length > 0) {
      // Load more if not first request, if not already fetching and if not empty list
      this.fetch(undefined, undefined, undefined, true);
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
        onSearchTermChange={this.onSearchTermChanged}
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

  renderFooter() {
    const fetchStatus = this.state.fetchStatus;
    const { style, renderFooter } = this.props;

    if (renderFooter) {
      // Render customized footer
      return renderFooter(fetchStatus);
    } else if (fetchStatus.fetching) {
      switch (fetchStatus.type) {
        case NEW_REQUEST:
          return <FullScreenSpinner style={style.newDataSpinner} />;
        case LOAD_MORE:
          return <View style={style.loadMoreSpinner}><PlatformSpinner /></View>;
        case REFRESH:
        default:
          return null;
      }
    }
    return null;
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
  onSearchTermChanged: React.PropTypes.func,
  queryParams: React.PropTypes.object,
  notRefreshable: React.PropTypes.bool,
  disablePagination: React.PropTypes.bool,
  hideFirstLoader: React.PropTypes.bool, // TODO(Braco) - either integrate it or deprecate
  sections: React.PropTypes.bool,
  renderRow: React.PropTypes.func,
  registerScrollRef: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  renderFooter: React.PropTypes.bool,
  fetch: React.PropTypes.func,
  items: React.PropTypes.array,
  infiniteScrolling: React.PropTypes.bool,
  onEndReachedThreshold: React.PropTypes.number,
  onEndReached: React.PropTypes.func,
};

const style = {
  header: {
    container: {},
    search: {},
  },
  list: {},
  newDataSpinner: {},
  loadMoreSpinner: {
    paddingVertical: 25,
  },
};

export default connectStyle('shoutem.ui.AdvancedListView', style)(AdvancedListView);
