import React, {
  TouchableHighlight,
  View,
  Text,
  Component,
  Image,
} from 'react-native';
import { connectStyle } from 'shoutem/theme/ThemeHelpers';

export default class Button extends Component {
  render() {
    const style = this.props.style;
    let buttonImage = null;
    if (this.props.icon) {
      buttonImage = <Image source={this.props.icon} style={style.buttonIcon} />;
    }
    const buttonText = this.props.text ?
      <Text style={style.buttonText}>{this.props.text}</Text> : null;
    if (!buttonImage && !buttonText) {
      return null;
    }
    return (
      <TouchableHighlight style={style.buttonContainer} underlayColor={'transparent'}>
        <View style={style.button}>
          {buttonImage}
          {buttonText}
        </View>
      </TouchableHighlight>
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
