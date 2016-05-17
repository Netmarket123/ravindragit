import React, {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connectStyle, INCLUDE } from 'shoutem/theme';

function Button({
  style,
  icon,
  showIconOnRight,
  text,
  onPress,
}) {
  let buttonIcon = null;
  if (icon) {
    buttonIcon = <Icon key="icon" name={icon} style={style.buttonIcon} />;
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
  icon: React.PropTypes.string,
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

export default connectStyle('dev.ext.Button', style)(Button);
