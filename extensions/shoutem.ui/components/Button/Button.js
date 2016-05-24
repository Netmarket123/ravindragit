import React, {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { connectStyle, INCLUDE } from 'shoutem/theme';

function Button({
  style,
  renderIcon,
  showIconOnRight,
  text,
  onPress,
}) {
  let buttonIcon = null;
  if (renderIcon) {
    buttonIcon = renderIcon();
  }
  const buttonText = text ?
    <Text key="text" style={style.buttonText}>{text}</Text> : null;

  if (!buttonIcon && !buttonText) {
    return null;
  }

  const content = showIconOnRight ? [buttonText, buttonIcon] : [buttonIcon, buttonText];

  return (
    <TouchableOpacity
      style={style.buttonContainer}
      underlayColor={style.buttonActive.backgroundColor}
      onPress={onPress}
    >
      <View style={style.button}>
        {content}
      </View>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  renderIcon: React.PropTypes.func,
  showIconOnRight: React.PropTypes.boolean,
  text: React.PropTypes.string,
  style: React.PropTypes.object,
  onPress: React.PropTypes.func,
};

const style = {
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#ccc',
  },
  buttonIcon: {},
  buttonText: {
    [INCLUDE]: ['baseFont'],
  },
};

export default connectStyle('shoutem.ui.Button', style)(Button);
