import React, {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import _ from 'lodash';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { connectStyle, INCLUDE } from 'shoutem/theme';

function Button({
  style,
  icon,
  showIconOnRight,
  text,
  onPress,
  iconType,
}) {
  let buttonIcon = null;

  function selectIconComponent(type) {
    return ({
      [Button.iconTypes.AWESOME_ICON]: AwesomeIcon,
      [Button.iconTypes.EVIL_ICON]: EvilIcons,
      [Button.iconTypes.MATERIAL_ICON]: MaterialIcon,
    })[type] || MaterialIcon;
  }

  const IconComponent = selectIconComponent(iconType);
  if (icon) {
    buttonIcon = <IconComponent key="icon" name={icon} style={style.buttonIcon} />;
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

Button.iconTypes = {
  MATERIAL_ICON: 'MaterialIcon',
  AWESOME_ICON: 'AwesomeIcon',
  EVIL_ICON: 'EvilIcon',
};

Button.propTypes = {
  iconType: React.PropTypes.oneOf(_.reduce(Button.iconTypes, (res, val) => res.concat([val]), [])),
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
  buttonIcon: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    [INCLUDE]: ['baseFont'],
  },
};

export default connectStyle('shoutem.ui.Button', style)(Button);
