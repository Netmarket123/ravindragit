import React, {
  TouchableOpacity,
  View,
  Text,
  Component,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connectStyle } from 'shoutem/theme';

class Button extends Component {
  static propTypes = {
    icon: React.PropTypes.any,
    text: React.PropTypes.string,
    style: React.PropTypes.object,
    onPress: React.PropTypes.func,
  };

  render() {
    const style = this.props.style;
    let buttonImage = null;
    if (this.props.icon) {
      buttonImage = <Icon name={this.props.icon} style={style.buttonIcon} />;
    }
    const buttonText = this.props.text ?
      <Text style={style.buttonText}>{this.props.text}</Text> : null;
    if (!buttonImage && !buttonText) {
      return null;
    }
    return (
      <TouchableOpacity
        style={style.buttonContainer}
        underlayColor={style.buttonActive.backgroundColor}
        onPress={this.props.onPress}
      >
        <View style={style.button}>
          {buttonImage}
          {buttonText}
        </View>
      </TouchableOpacity>
    );
  }
}

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
