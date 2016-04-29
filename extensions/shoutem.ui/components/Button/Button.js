import React, {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connectStyle } from 'shoutem/theme';

function Button({
  style,
  icon,
  text,
  onPress,
  iconOnRight
}) {
  let buttonImage = null;
  if (icon) {
    buttonImage = <Icon name={icon} style={style.buttonIcon} />;
  }
  const buttonText = text ?
    <Text style={style.buttonText}>{text}</Text> : null;

  if (!buttonImage && !buttonText) {
    return null;
  }

  let content;

  if (iconOnRight) {
    content = (
      <View style={style.button}>
        {buttonText}
        {buttonImage}
      </View>
    );
  } else {
    content = (
      <View style={style.button}>
        {buttonImage}
        {buttonText}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={style.buttonContainer}
      underlayColor={style.buttonActive.backgroundColor}
      onPress={onPress}
    >
      {content}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  icon: React.PropTypes.string,
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
  buttonText: {},
};

export default connectStyle('dev.ext.Button', style)(Button);
