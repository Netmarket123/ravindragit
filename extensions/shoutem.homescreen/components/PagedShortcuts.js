import React, {
  Component,
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import ShortcutsGrid from './ShortcutsGrid';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  dimensions: React.PropTypes.shape({
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
  }),
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

export default class PagedShortcuts extends Component {
  constructor(props) {
    super(props);
    const pagerDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
    const { shortcutsData, dimensions } = props;

    const pageSize = dimensions.rows * dimensions.cols;
    const pages = splitIntoPages(shortcutsData, pageSize);

    this.state = {
      pagingDataSource: pagerDs.cloneWithPages(pages),
      style: getStyleForLayoutPosition(this.props.layoutPosition),
    };

    this.renderPage = this.renderPage.bind(this);
  }

  renderPage(data) {
    return (
      <ShortcutsGrid gridItems={data}
        dimensions={this.props.dimensions}
        layoutPosition={this.props.layoutPosition}
      />
    );
  }

  render() {
    return (
      <View style={[styles.container, this.state.style.container]}>
        <ViewPager
          dataSource={this.state.pagingDataSource}
          renderPage={this.renderPage}
        />
      </View>
    );
  }
}

PagedShortcuts.propTypes = propTypes;

