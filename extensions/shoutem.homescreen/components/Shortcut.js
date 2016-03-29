import React, {
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  PropTypes,
} from 'react-native';

import { connect } from 'react-redux';
import { actions } from 'shoutem.application';
import shortcutDataShape from './ShortcutDataShape';

const propTypes = {
  shortcutData: PropTypes.shape(shortcutDataShape),
};

const defaultStyles = {
  shortcut: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
};

const styles = StyleSheet.create(defaultStyles);

function getMarginStyle(margin) {
  return {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };
}

export function generateStyle(configuration) {
  const {
      iconSize,
      margin,
    } = configuration;

  const shortcut = Object.assign({}, defaultStyles.shortcut, getMarginStyle(margin));
  const buttonIcon = Object.assign({}, defaultStyles.buttonIcon, iconSize);

  return {
    shortcut,
    buttonIcon,
  };
}

class Shortcut extends Component {
  navigateToScreen(screen) {
    const { dispatch } = this.props;

    return () => {
      dispatch(actions.executeShortcut(screen.shortcutData));
    };
  }

  render() {
    const { shortcut, buttonIcon } = generateStyle(this.props.shortcutData.config);
    const { uri, highlightedUri } = this.props.shortcutData;

    return (
        <View style={[styles.shortcut, shortcut]}>
          <Image
            source={{ uri }}
            style={[styles.buttonIcon, buttonIcon, styles.hiddenIcon]}
            resizeMode={Image.resizeMode.stretch}
          />
          <TouchableOpacity activeOpacity={0} onPress={this.navigateToScreen(this.props)}>
            <Image
              source={this.props.shortcutData}
              source={{ uri: highlightedUri }}
              style={[styles.buttonIcon, buttonIcon]}
              resizeMode={Image.resizeMode.stretch}
            />
          </TouchableOpacity>
        </View>
    );
  }
}

Shortcut.propTypes = propTypes;

export default connect()(Shortcut);
