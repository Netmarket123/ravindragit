import React from 'react';
import {
  View,
  ListView as RNListView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { connectStyle } from '@shoutem/theme';
import { Spinner } from './Spinner';


const Status = {
  LOADING: 'loading',
  LOADING_NEXT: 'loadingNext',
  REFRESHING: 'refreshing',
  ERROR: 'error',
  IDLE: 'idle',
};

/**
 * Provides dataSource to ListView.
 * Clones items and group them by section if needed.
 */
class ListDataSource {
  constructor(config, getSectionId) {
    this.getSectionId = getSectionId;
    this.withSections = !!config.sectionHeaderHasChanged;
    this.dataSource = new RNListView.DataSource(config);
  }

  /**
   * Transforms items list ([...items]) to [[...sectionItems], [...sectionItems]]
   * @param data
   * @returns {*}
   */
  groupItemsIntoSections(data) {
    let prevSectionId;
    return data.reduce((sections, item) => {
      const sectionId = this.getSectionId(item);
      if (prevSectionId !== sectionId) {
        prevSectionId = sectionId;
        sections.push([]);
      }
      const lastSectionIndex = sections.length - 1;
      sections[lastSectionIndex].push(item);
      return sections;
    }, []);
  }

  /**
   * Transforms items list [<item>, <item>]
   * @param data
   * @returns {*}
   */
  clone(data) {
    if (this.withSections) {
      return this.dataSource.cloneWithRowsAndSections(this.groupItemsIntoSections(data));
    }
    return this.dataSource.cloneWithRows(data);
  }
}

class ListView extends React.Component {
  static propTypes = {
    autoHideHeader: React.PropTypes.bool,
    style: React.PropTypes.object,
    data: React.PropTypes.array,
    loading: React.PropTypes.bool,
    onLoadMore: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    getSectionId: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader: React.PropTypes.func,
    // TODO(Braco) - add render separator
  };

  constructor(props, context) {
    super(props, context);
    this.handleListViewRef = this.handleListViewRef.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.autoHideHeader = this.autoHideHeader.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.listView = null;


    this.listDataSource = new ListDataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: props.renderSectionHeader ? (s1, s2) => s1 !== s2 : undefined,
      getSectionHeaderData: (dataBlob, sectionId) => props.getSectionId(dataBlob[sectionId][0]),
    }, props.getSectionId);


    this.state = {
      status: Status.LOADING,
      nextLoadingStatus: Status.LOADING,
      dataSource: this.listDataSource.clone(props.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ dataSource: this.listDataSource.clone(nextProps.data) });
    }

    if (nextProps.loading !== this.props.loading) {
      this.setLoading(nextProps.loading);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.data !== this.props.data) ||
      (nextProps.loading !== this.props.loading) ||
      (nextState.status !== this.state.status);
  }

  onRefresh() {
    this.setState({
      status: Status.REFRESHING,
      nextLoadingStatus: Status.REFRESHING,
    });

    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  /**
   * Used to map props we are passing to GiftedListView from our ListView.
   * Setting default values.
   * @returns {{}}
   */
  getPropsToPass() {
    const props = this.props;
    const mappedProps = {};

    // configuration
    // default load more threshold
    mappedProps.onEndReachedThreshold = 40;
    // React native warning
    // NOTE: In react 0.23 it can't be set to false
    mappedProps.enableEmptySections = true;

    // style
    mappedProps.customStyles = props.style.list;

    mappedProps.contentContainerStyle = props.style.listContent;

    // rendering
    mappedProps.renderHeader = this.createRenderHeader(props.renderHeader, props.autoHideHeader);
    mappedProps.renderRow = props.renderRow;
    mappedProps.renderFooter = this.renderFooter;
    mappedProps.renderSectionHeader = props.renderSectionHeader;

    // events
    mappedProps.onEndReached = props.onLoadMore;

    // data to display
    mappedProps.dataSource = this.state.dataSource;

    // refresh control
    mappedProps.refreshControl = props.onRefresh && this.renderRefreshControl();

    // reference
    mappedProps.ref = this.handleListViewRef;

    return mappedProps;
  }

  setLoading(loading) {
    if (loading) {
      this.setState({
        status: this.state.nextLoadingStatus,
        nextLoadingStatus: Status.LOADING,
      });
    } else {
      this.setState({
        status: Status.IDLE,
      });
    }
  }

  autoHideHeader({ nativeEvent: { layout: { height } } }) {
    this.scrollListView({ y: height, animated: false });
  }

  createRenderHeader(renderHeader, autoHideHeader) {
    const headerProps = {};
    if (!renderHeader) {
      return;
    }

    if (autoHideHeader) {
      headerProps.onLayout = this.autoHideHeader;
    }

    // eslint-disable-next-line consistent-return
    return () => (
      <View {...headerProps}>{renderHeader()}</View>
    );
  }

  scrollListView(scrollOptions) {
    this.listView.scrollTo(scrollOptions);
  }

  /**
   * Save RN ListView ref
   * @param listView React native ListView ref
   */
  handleListViewRef(listView) {
    if (!listView) {
      return;
    }

    this.listView = listView;
  }

  renderFooter() {
    const { style, renderFooter } = this.props;
    const { status } = this.state;
    let spinner;

    let showNetworkActivity = true;
    switch (status) {
      case Status.LOADING:
        spinner = <View style={style.loadMoreSpinner}><Spinner /></View>;
        break;
      case Status.LOADING_NEXT:
        spinner = <View style={style.loadMoreSpinner}><Spinner /></View>;
        break;
      case Status.REFRESHING:
        spinner = null;
        break;
      default:
        showNetworkActivity = false;
        spinner = null;
    }

    StatusBar.setNetworkActivityIndicatorVisible(showNetworkActivity);

    return (
      <View>
        {spinner}
        {renderFooter ? renderFooter() : null}
      </View>
    );
  }

  renderRefreshControl() {
    const { style } = this.props;
    const { status } = this.state;

    return (
      <RefreshControl
        onRefresh={this.onRefresh}
        refreshing={status === Status.REFRESHING}
        tintColor={style.tintColor.backgroundColor}
      />
    );
  }

  render() {
    // TODO(Braco) - handle no results view
    // TODO(Braco) - handle no more results view
    // TODO(Braco) - handle error view
    return <RNListView {...this.getPropsToPass()} />;
  }
}

const StyledListView = connectStyle('shoutem.ui.ListView', {})(ListView);

export {
  StyledListView as ListView,
};
