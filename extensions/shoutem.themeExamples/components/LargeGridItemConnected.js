import React, {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import InfoFields from './InfoFields';
import { connectStyle } from '../theme/ThemeHelpers';


class LargeGridItemConnected extends React.Component {
  infoFieldsCustomStyle() {
    return {
      infoText: this.props.style.eventInfoText,
      infoSeparator: this.props.style.eventInfoSeparator,
    };
  }

  render() {
    const style = this.props.style;
    return (
      <View style={style.container}>
        <View style={style.backgroundImageWrapper}>
          <Image style={style.backgroundImage} source={this.props.backgroundImage} />
        </View>
        <Text style={style.h1}>{this.props.headline}</Text>
        <InfoFields
          infoFields={this.props.infoFields}
          infoSeparator={this.props.infoSeparator}
        />
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
  buttonIcon: React.PropTypes.any,
  backgroundImage: React.PropTypes.any,
  infoSeparator: React.PropTypes.any,
  style: React.PropTypes.object,
  infoFields: React.PropTypes.array,
  buttonText: React.PropTypes.string,
  headline: React.PropTypes.string,
};

const style = {
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
    color: 'black',
    // fontSize: 20 // inherited from theme (for example)
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
  },
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, undefined, undefined, { withRef: true })(
  connectStyle('dev.ext.LargeGridItem', style)(LargeGridItemConnected)
);
