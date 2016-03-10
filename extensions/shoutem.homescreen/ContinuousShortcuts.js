import React, {
  Component,
  ListView,
  StyleSheet,
} from 'react-native';

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
  verticalAlignment: {
    flex: 1,
  },
});

export default class ContinuousShortcuts extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(shortcutsData),
      style: this.props.layoutPositionStyle,
    };
  }

  _renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  render() {
    return (
      <ListView style={[styles.verticalAlignment, this.state.style.verticalAlignment]}
        contentContainerStyle={[styles.horizontalAlignment, this.state.style.horizontalAlignment]}
        dataSource={this.state.dataSource}
        renderRow={this._renderListItem}
      />
    );
  }
}

