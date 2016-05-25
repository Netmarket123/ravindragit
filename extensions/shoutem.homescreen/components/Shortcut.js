import React, {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  PropTypes,
} from 'react-native';

import { actions } from 'shoutem.application';
import shortcutDataShape from './ShortcutDataShape';
import buttonConfigShape from './ButtonConfigShape';
import { connect } from 'react-redux';

const propTypes = {
  shortcutData: PropTypes.shape(shortcutDataShape),
  buttonConfig: PropTypes.shape(buttonConfigShape),
  dispatch: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function Shortcut({
  shortcutData,
  buttonConfig,
  dispatch,
}) {
  function execute() {
    dispatch(actions.executeShortcut(shortcutData));
  }

  const { shortcut, buttonIcon } = generateStyle(buttonConfig);
  const { iconUrl, highlightedIconUrl } = shortcutData.attributes;

  return (
    <View style={[styles.shortcut, shortcut]}>
      <Image
        source={{ uri: iconUrl }}
        style={[styles.buttonIcon, buttonIcon, styles.hiddenIcon]}
        resizeMode={Image.resizeMode.stretch}
      />
      <TouchableOpacity activeOpacity={0} onPress={execute}>
        <Image
          source={shortcutData}
          source={{ uri: highlightedIconUrl || iconUrl }}
          style={[styles.buttonIcon, buttonIcon]}
          resizeMode={Image.resizeMode.stretch}
        />
      </TouchableOpacity>
    </View>
  );
}

Shortcut.propTypes = propTypes;

export default connect(undefined, mapDispatchToProps)(Shortcut);
