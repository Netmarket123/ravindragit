import React, {
  TouchableOpacity,
  View,
  Text,
  Component,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import connectStyle from 'shoutem/theme/StyleConnector';

export default class Button extends Component {
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
      <TouchableOpacity style={style.buttonContainer} underlayColor={'transparent'} onPress={this.props.onPress}>
        <View style={style.button}>
          {buttonImage}
          {buttonText}
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  icon: React.PropTypes.any,
  text: React.PropTypes.string,
  style: React.PropTypes.object,
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
  buttonIcon: {},
  buttonText: {},
};

export default connectStyle('dev.ext.Button', style)(Button);
