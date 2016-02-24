import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Theme  from '../theme/Theme';
import ShoutemComponent from './ShoutemComponent';

export default class LargeGridItemExtended extends ShoutemComponent {
  renderInfoFields() {
    const infoFieldsComponents = [];
    if (this.props.infoFields.length > 0) {
      this.props.infoFields.forEach((info, i) => {
        if (i > 0 && this.props.infoSeparator) {
          infoFieldsComponents.push(
            <Image
              style={this.theme.infoSeparator}
              source={this.props.infoSeparator}
              key={i * -1}
            />
          ); // key i * -1 ?
        }
        infoFieldsComponents.push(
          <Text style={[this.theme.paragraph, this.theme.infoText]} key={i}>{info}</Text>
        );
      });
    }
    return infoFieldsComponents;
  }

  render() {
    return (
      <View style={this.theme.container}>
        <View style={this.theme.backgroundImageWrapper}>
          <Image style={this.theme.backgroundImage} source={this.props.backgroundImage} />
        </View>
        <Text style={this.theme.h1}>{this.props.headline}</Text>
        <View style={this.theme.info}>
          {this.renderInfoFields()}
        </View>
        <TouchableHighlight>
          <View style={this.theme.button}>
            <Image source={this.props.buttonIcon} style={this.theme.buttonIcon} />
            <Text style={this.theme.buttonText}>{this.props.buttonText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
Theme.registerComponentStyle('LargeGridItemExtended', {
  backgroundImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  backgroundImage: {
    flex: 1,
    marginTop: -90,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 100,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  h1: {
    paddingHorizontal: 20,
    textAlign: 'center',
    // fontSize: 20 // inherited from theme (for example)
  },
  infoSeparator: {
    marginHorizontal: 10,
    flex: 1,
    width: 3,
    height: 3,
  },
  infoText: {
    fontSize: 12,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 2,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 12,
    color: Theme.variables.colorDark, // variable usage
  },
});
