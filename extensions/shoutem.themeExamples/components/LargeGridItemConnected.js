import React, {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Theme, { applyTheme } from '../theme/Theme';
import { connect } from 'redux';

export default class LargeGridItemConnected extends React.Component {
  renderInfoFields() {
    const infoFieldsComponents = [];
    if (this.props.infoFields.length > 0) {
      this.props.infoFields.forEach((info, i) => {
        if (i > 0 && this.props.infoSeparator) {
          infoFieldsComponents.push(
            <Image
              style={this.props.style.infoSeparator}
              source={this.props.infoSeparator}
              key={i * -1}
            />
          ); // key i * -1 ?
        }
        infoFieldsComponents.push(
          <Text style={[this.props.style.paragraph, this.props.style.infoText]} key={i}>
            {info}
          </Text>
        );
      });
    }
    return infoFieldsComponents;
  }

  render() {
    const style = this.props.style;
    return (
      <View style={style.container}>
        <View style={style.backgroundImageWrapper}>
          <Image style={style.backgroundImage} source={this.props.backgroundImage} />
        </View>
        <Text style={style.h1}>{this.props.headline}</Text>
        <View style={style.info}>
          {this.renderInfoFields()}
        </View>
        <TouchableHighlight>
          <View style={style.button}>
            <Image source={this.props.buttonIcon} style={style.buttonIcon} />
            <Text style={style.buttonText}>{this.props.buttonText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
LargeGridItemConnected.propTypes = {
  buttonIcon: React.propTypes.object,
  backgroundImage: React.propTypes.object,
  infoSeparator: React.propTypes.object,
  style: React.propTypes.object,
  infoFields: React.propTypes.array,
  buttonText: React.propTypes.string,
  headline: React.propTypes.string,
};
const style = Theme.createStyle({
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
function mapStateToProps(state) {
  return {
    headline: state.headline,
  };
}

export default connect(mapStateToProps)(
  applyTheme(style)(LargeGridItemConnected)
);
