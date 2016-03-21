import React, {
  TouchableHighlight,
  View,
  Text,
  Component,
  Image,
} from 'react-native';
import connectStyle from '../theme/StyleConnector';

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
      <TouchableHighlight style={style.button} underlayColor={style.buttonActive.backgroundColor}>
        <View style={style.buttonContent}>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
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
