import React, {
  View,
  ListView as RNListView,
  RefreshControl,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';
import { FullScreenSpinner, PlatformSpinner } from 'shoutem.ui';

const GET_PROPS_TO_PASS = Symbol('getPropsToPass');
const HANDLE_LIST_VIEW_REF = Symbol('handleListViewRef');

const Status = {
  LOADING: 'loading',
  LOADING_NEXT: 'loadingNext',
  REFRESHING: 'refreshing',
  ERROR: 'error',
  IDLE: 'idle',
};

class ListView extends React.Component {
  static propTypes = {
    status: React.PropTypes.string,
    style: React.PropTypes.object,
    items: React.PropTypes.array,
    onLoadMore: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader: React.PropTypes.bool,
  };
  static Status = Status;
  constructor(props, context) {
    super(props, context);
    this[HANDLE_LIST_VIEW_REF] = this[HANDLE_LIST_VIEW_REF].bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.listView = null;
    this.giftedListView = null;
    const dataSource = new RNListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: dataSource.cloneWithRows([]),
    };
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (this.giftedListView && nextProps.items !== items) {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(items) });
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

  onRefresh() {
    this.props.onRefresh();
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
    mappedProps.renderHeader = props.renderHeader;
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

    mappedProps.dataSource = this.state.dataSource;
    mappedProps.refreshControl = props.onRefresh && this.renderRefreshControl();

    return mappedProps;
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
    const { status, style, renderFooter } = this.props;
    let spinner;

    switch (status) {
      case Status.LOADING:
        spinner = <FullScreenSpinner style={style.newDataSpinner} />;
        break;
      case Status.LOADING_NEXT:
        spinner = <View style={style.loadMoreSpinner}><PlatformSpinner /></View>;
        break;
      case Status.REFRESHING:
      default:
        spinner = null;
    }

    return (
      <View>
        {spinner}
        {renderFooter ? renderFooter() : null}
      </View>
    );
  }

  renderRefreshControl() {
    const { status, style } = this.props;
    return (
      <RefreshControl
        onRefresh={this.onRefresh}
        refreshing={status === Status.REFRESHING}
        tintColor={style.tiltColor.backgroundColor}
      />
    );
  }

  render() {
    // TODO(Braco) - handle no results view
    return (<RNListView
      ref={this[HANDLE_LIST_VIEW_REF]}
      {...this[GET_PROPS_TO_PASS]()}
    />);
  }
}

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

export default connectStyle('shoutem.ui.ListView', style)(ListView);
