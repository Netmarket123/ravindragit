import React, {
  Component,
  ListView,
  StyleSheet,
}
from 'react-native';

import ConfigurationReader from './ConfigurationReader';
import Shortcut from './Shortcut';

const configurationReader = new ConfigurationReader();
const buttonConfig = {
  layoutDimension: configurationReader.getLayoutDimension(),
  scalingStrategy: configurationReader.getScalingStrategy(),
  size: configurationReader.getButtonSize(),
  iconSize: configurationReader.getButtonIconSize(),
  margin: configurationReader.getButtonMargin(),
};

const shortcutsData = configurationReader.getShortcuts().map((shortcut) => {
  return {
    uri: shortcut.buttonImageUrl,
    config: buttonConfig,
  };
});

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

function getStyleForLayoutPosition(layoutPosition) {
  return {
    list: {
      alignSelf: layoutPosition.verticalAlignment,
    },
    contentContainer: {
      alignSelf: layoutPosition.horizontalAlignment,
    },
  };
}

export default class ContinuousShortcuts extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(shortcutsData),
      style: getStyleForLayoutPosition(this.props.layoutPosition),
    };
  }

  _renderListItem(data) {
    return <Shortcut shortcutData = { data } />;
  }

  render() {
    return (
      <ListView style={[styles.list, this.state.style.list]}
        contentContainerStyle={[styles.contentContainer, this.state.style.contentContainer]}
        dataSource={this.state.dataSource}
        renderRow={this._renderListItem}
      / >
  );
  }
}

