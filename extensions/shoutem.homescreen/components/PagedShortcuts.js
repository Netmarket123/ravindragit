import React, {
  Component,
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import ShortcutsGrid from './ShortcutsGrid';
import shortcutDataShape from './ShortcutDataShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  dimensions: React.PropTypes.shape({
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// TODO(Vladimir) - extract to mixin/decorator
function splitIntoPages(items, pageSize) {
  return items.reduce((currentPages, item) => {
    let lastPage = currentPages.find((page) => page.length < pageSize);

    if (!lastPage) {
      lastPage = [];
      currentPages.push(lastPage);
    }

    lastPage.push(item);

    return currentPages;
  }, [[]]);
}

function getStyleForLayoutPosition(layoutPosition) {
  return {
    container: {
      alignSelf: layoutPosition.verticalAlignment,
    },
  };
}

function createPagingDataSource(data, dimensions) {
  const pagerDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
  const pageSize = dimensions.rows * dimensions.cols;
  const pages = splitIntoPages(data, pageSize);

  return pagerDs.cloneWithPages(pages);
}

export default class PagedShortcuts extends Component {
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage(data) {
    return (
      <ShortcutsGrid gridItems={data}
        dimensions={this.props.dimensions}
        layoutPosition={this.props.layoutPosition}
      />
    );

    // TODO:(Vladimir) - OR ShortcutsList
  }

  render() {
    return (
      <View style={[styles.container, getStyleForLayoutPosition(this.props).container]}>
        <ViewPager
          dataSource={createPagingDataSource(this.props.shortcutsData, this.props.dimensions)}
          renderPage={this.renderPage}
        />
      </View>
    );
  }
}

PagedShortcuts.propTypes = propTypes;

