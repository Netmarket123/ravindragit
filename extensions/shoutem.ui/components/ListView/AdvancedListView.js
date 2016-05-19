import React, {
  View,
} from 'react-native';
import _ from 'lodash';
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
    this.handleFetchAction = this.handleFetchAction.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.listView = null;
    this.giftedListView = null;
    this.state = {
      fetchStatus: {
        requestNumber: 0, // Maybe only did request ?
        fetching: false,
        type: undefined,
        noMoreItems: false,
      },
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
    if (!_.isEqual(nextProps.queryParams, queryParams)) {
      // Compare current query params and new, if different make new request
      // QueryParams can be changed from outside
      this.fetch(undefined, undefined, undefined, nextProps.queryParams);
    }
    return true;
  }

  /**
   * Triggered when list end threshold reached (scrolled to)
   */
  onEndReached() {
    if (this.props.onLoadMore) {
      this.onLoadMore();
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
    const mappedProps = {};

    // Override properties
    // Display a loader for the first fetching
    mappedProps.firstLoader = true;
    // GiftedListView pagination disabled - we use onLoadMore (infinite scrolling)
    mappedProps.pagination = false;
    // Default load more threshold
    mappedProps.onEndReachedThreshold = 40;
    // React native warning
    // NOTE: In react 0.23 it can't be set to false
    mappedProps.enableEmptySections = true;

    // Mapped properties
    // Enable pull-to-refresh for iOS and touch-to-refresh for Android
    mappedProps.refreshable = !!props.onRefresh;
    // Enable sections
    mappedProps.withSections = !!props.renderSectionHeader;
    // Set renderSectionHeader method
    mappedProps.renderSectionHeader = props.renderSectionHeader;
    // Tilt color
    mappedProps.refreshableTintColor = props.style.tiltColor.backgroundColor;
    // create headerView function if there is something to render in header
    mappedProps.headerView = props.renderHeader;
    // We do not want to pass style to GiftedListView, it uses customStyle
    mappedProps.customStyles = props.style.list;
    // Map render row function
    mappedProps.renderRow = props.renderRow;
    // Passed contentContainerStyle
    mappedProps.contentContainerStyle = props.style.listContent;
    // Override GiftedListView renderFooter
    mappedProps.renderFooter = this.renderFooter;
    // Handle on scroll end reach
    mappedProps.onEndReached = this.onEndReached; // TODO(Braco) - status condition
    // Handle default onFetch from GiftedListView - used to override some features
    mappedProps.onFetch = this.handleFetchAction;

    return mappedProps;
  }

  /**
   * Called by GiftedListView with (page, callback, options) args.
   * Override default GiftedListView behavior.
   *
   */
  handleFetchAction() {
    if (
      // did parent provide onRefresh handle
      this.props.onRefresh &&
      // is pull down to refresh action
      this.giftedListView && this.giftedListView.state.isRefreshing
    ) {
      this.props.onRefresh();
    }

    // GiftedListView actions we do not use anymore:
    //  - first fetch
  }

  /**
   * Save RN ListView GiftedListViewRef
   * @param GiftedListViewRef
   */
  [HANDLE_LIST_VIEW_REF](GiftedListViewRef) {
    if (!GiftedListViewRef) {
      return;
    }

    this.giftedListView = GiftedListViewRef;
    this.listView = GiftedListViewRef.refs.listview;
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
    // TODO(Braco) - handle no results view
    return (<GiftedListView
      ref={this[HANDLE_LIST_VIEW_REF]}
      {...this[GET_PROPS_TO_PASS]()}
    />);
  }
}

AdvancedListView.propTypes = {
  queryParams: React.PropTypes.object,
  fetch: React.PropTypes.func,

  style: React.PropTypes.object,
  items: React.PropTypes.array,
  onLoadMore: React.PropTypes.func,
  onRefresh: React.PropTypes.func,
  renderRow: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  renderFooter: React.PropTypes.func,
  renderSectionHeader: React.PropTypes.bool,
};
// style: React.PropTypes.object,
//   items: React.PropTypes.array,
//   renderRow: React.PropTypes.func,
//   renderHeader: React.PropTypes.func,
//   renderSectionHeader: React.PropTypes.func,
//   renderFooter: React.PropTypes.func,
//   onLoadMore: React.PropTypes.func,
//   onRefresh: React.PropTypes.func,
// status


const style = {
  header: {
    container: {},
  },
  list: {},
  listContent: {},
  tiltColor: {
    // uses only background color
    backgroundColor: '#ccc',
  },
  newDataSpinner: {},
  loadMoreSpinner: {
    paddingVertical: 25,
  },
};

export default connectStyle('shoutem.ui.AdvancedListView', style)(AdvancedListView);
