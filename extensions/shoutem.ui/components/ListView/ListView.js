import React, {
  View,
  ListView as RNListView,
  RefreshControl,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';
import { FullScreenSpinner, PlatformSpinner } from 'shoutem.ui';

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
  groupItemsIntoSections(items) {
    let prevSectionId;
    return items.reduce((sections, item) => {
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
  clone(items) {
    if (this.withSections) {
      return this.dataSource.cloneWithRowsAndSections(this.groupItemsIntoSections(items));
    }
    return this.dataSource.cloneWithRows(items);
  }
}

class ListView extends React.Component {
  static propTypes = {
    status: React.PropTypes.string,
    style: React.PropTypes.object,
    items: React.PropTypes.array,
    onLoadMore: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    getSectionId: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader: React.PropTypes.func,
  };
  static Status = Status;

  constructor(props, context) {
    super(props, context);
    this.handleListViewRef = this.handleListViewRef.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.listView = null;


    this.listDataSource = new ListDataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: props.renderSectionHeader ? (s1, s2) => s1 !== s2 : undefined,
      getSectionHeaderData: (dataBlob, sectionId) => props.getSectionId(dataBlob[sectionId][0]),
    }, props.getSectionId);


    this.state = {
      dataSource: this.listDataSource.clone(props.items),
    };
  }

  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items !== items) {
      this.setState({ dataSource: this.listDataSource.clone(nextProps.items) });
    }
    return true;
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
    mappedProps.renderHeader = props.renderHeader;
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

  /**
   * Save RN ListView ref
   * @param React native ListView ref
   */
  handleListViewRef(listView) {
    if (!listView) {
      return;
    }

    this.listView = listView;
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
    const { status, style, onRefresh } = this.props;
    return (
      <RefreshControl
        onRefresh={onRefresh}
        refreshing={status === Status.REFRESHING}
        tintColor={style.tiltColor.backgroundColor}
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
