import React, {
  View,
  StyleSheet,
  PropTypes,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import ShortcutsGrid from './ShortcutsGrid';
import shortcutDataShape from './ShortcutDataShape';
import buttonConfigShape from './ButtonConfigShape';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
  shortcutsData: PropTypes.arrayOf(PropTypes.shape(shortcutDataShape)),
  buttonConfig: PropTypes.shape(buttonConfigShape),
  dimensions: PropTypes.shape({
    cols: PropTypes.number,
    rows: PropTypes.number,
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

function getStyleForContainerLayoutPosition(layoutPosition) {
  return {
    alignSelf: layoutPosition.verticalAlignment,
  };
}

function createPagingDataSource(data, dimensions) {
  const pagerDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
  const pageSize = dimensions.rows * dimensions.cols;
  const pages = splitIntoPages(data, pageSize);

  return pagerDs.cloneWithPages(pages);
}

export default function PagedScroller({
  layoutPosition,
  shortcutsData,
  buttonConfig,
  dimensions,
}) {
  function renderPage(data) {
    return (
      <ShortcutsGrid gridItems={data}
        dimensions={dimensions}
        layoutPosition={layoutPosition}
        buttonConfig={buttonConfig}
      />
    );
  }

  const containerLayoutPosition = getStyleForContainerLayoutPosition(layoutPosition);
  return (
    <View style={[styles.container, containerLayoutPosition]}>
    <ViewPager
      dataSource={createPagingDataSource(shortcutsData, dimensions)}
      renderPage={renderPage}
    />
    </View>
  );
}

PagedScroller.propTypes = propTypes;

