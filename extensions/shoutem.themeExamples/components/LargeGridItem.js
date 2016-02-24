import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  PropTypes,
} from 'react-native';
import { createStyle, variables } from '../theme/Theme';

const theme = createStyle({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 100,
    paddingBottom: 60,
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
    color: variables.colorDark, // variable usage
  },
});
export default class LargeGridItem extends Component {
  renderInfoFields() {
    const infoFieldsComponents = [];
    if (this.props.infoFields.length > 0) {
      this.props.infoFields.forEach((info, i) => {
        if (i > 0 && this.props.infoSeparator) {
          infoFieldsComponents.push(
            <Image style={theme.infoSeparator} source={this.props.infoSeparator} key={i * -1} />
          ); // key i * -1 ?
        }
        infoFieldsComponents.push(
          <Text style={[theme.paragraph, theme.infoText]} key={i}>{info}</Text>
        );
      });
    }
    return infoFieldsComponents;
  }

  render() {
    return (
      <View style={theme.container}>
        <Image style={theme.backgroundImage} source={this.props.backgroundImage}/>
        <Text style={theme.h1}>{this.props.headline}</Text>
        <View style={theme.info}>
          {this.renderInfoFields()}
        </View>
        <TouchableHighlight>
          <View style={theme.button}>
            <Image source={this.props.buttonIcon} style={theme.buttonIcon} />
            <Text style={theme.buttonText}>{this.props.buttonText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

LargeGridItem.propTypes = {
  infoFields: React.PropTypes.array,
};
