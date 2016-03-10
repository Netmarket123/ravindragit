import React, {
  Component,
  View,
  StyleSheet,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import ShortcutsGrid from './ShortcutsGrid';
import ConfigurationReader from './ConfigurationReader';

const configurationReader = new ConfigurationReader();
const buttonConfig = {
  layoutDimension: configurationReader.getLayoutDimension(),
  scalingStrategy: configurationReader.getScalingStrategy(),
  size: configurationReader.getButtonSize(),
  iconSize: configurationReader.getButtonIconSize(),
  margin: configurationReader.getButtonMargin(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const shortcutsData = configurationReader.getShortcuts().map((shortcut) => {
  return {
    uri: shortcut.buttonImageUrl,
    config: buttonConfig,
  };
});

const pageDimensions = {
  rows: configurationReader.getRowCount(),
  cols: configurationReader.getColumnCount(),
};

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

export default class Shortcuts extends Component {
  constructor(props) {
    super(props);
    const pagerDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });

    const pageSize = pageDimensions.rows * pageDimensions.cols;
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
        dimensions={pageDimensions}
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

