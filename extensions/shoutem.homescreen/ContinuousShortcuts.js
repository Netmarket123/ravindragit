import React, {
  Component,
  ListView,
  StyleSheet,
  PropTypes,
} from 'react-native';

// TODO(Vladimir) - read all configuration data from props
import configurationProvider from './ConfigurationProvider';
import Shortcut from './Shortcut';

const propTypes = {
  layoutPosition: PropTypes.shape({
    verticalAlignment: PropTypes.string,
    horizontalAlignment: PropTypes.string,
  }),
};

const buttonConfig = {
  layoutDimension: configurationProvider.getLayoutDimension(),
  scalingStrategy: configurationProvider.getScalingStrategy(),
  size: configurationProvider.getButtonSize(),
  iconSize: configurationProvider.getButtonIconSize(),
  margin: configurationProvider.getButtonMargin(),
};

const shortcutsData = configurationProvider.getShortcuts().map(shortcut => ({
  uri: shortcut.buttonImageUrl,
  highlightedUri: shortcut.buttonImageHighlightedUrl,
  config: buttonConfig,
}));

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

  renderListItem(data) {
    return <Shortcut shortcutData={data} />;
  }

  render() {
    return (
      <ListView style={[styles.list, this.state.style.list]}
        contentContainerStyle={[styles.contentContainer, this.state.style.contentContainer]}
        dataSource={this.state.dataSource}
        renderRow={this.renderListItem}
      />
    );
  }
}

ContinuousShortcuts.propTypes = propTypes;

