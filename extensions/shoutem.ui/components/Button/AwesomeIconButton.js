import React from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connectStyle, INCLUDE } from 'shoutem/theme';

function AwesomeIconButton({
  style,
  iconName,
  showIconOnRight,
  text,
  onPress,
}) {
  const renderIcon = () =>
      <Icon name={iconName} style={style.buttonIcon} />
    ;

  return (
    <Button
      renderIcon={renderIcon}
      showIconOnRight={showIconOnRight}
      text={text}
      onPress={onPress}
      style={style}
    />
  );
}

AwesomeIconButton.propTypes = {
  iconName: React.PropTypes.string,
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

export default connectStyle('shoutem.ui.AwesomeIconButton', style)(AwesomeIconButton);






