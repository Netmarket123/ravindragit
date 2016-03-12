import React, {
  Text,
  View,
  Image,
} from 'react-native';
import InfoFields from './InfoFields';
import Button from './Button';
import { connectStyle } from 'shoutem/theme/ThemeHelpers';

class LargeGridItem extends React.Component {
  infoFieldsStyle() {
    const style = this.props.style;
    return {
      infoText: style.infoText,
      infoSeparator: style.infoSeparator,
      info: style.info,
    };
  }

  bottomButtonStyle() {
    const style = this.props.style;
    return {
      button: style.bottomButton,
      buttonContainer: style.bottomButtonContainer,
      buttonIcon: style.bottomButtonIcon,
      buttonText: style.bottomButtonText,
    };
  }

  render() {
    const { style, topLabel, bottomLabel } = this.props;
    const topLabelComp = topLabel ? <Text style={style.topLabel}>{topLabel}</Text> : null;
    const botLabelComp = bottomLabel ? <Text style={style.bottomLabel}>{bottomLabel}</Text> : null;
    return (
      <View style={style.container}>
        <Image
          style={style.backgroundImage}
          source={this.props.backgroundImage}
        >
          <View style={style.imageOverlay}>
            {topLabelComp}
            <Text style={style.h1}>{this.props.headline}</Text>
            <InfoFields
              infoFields={this.props.infoFields}
              infoSeparator={this.props.infoSeparator}
              style={this.infoFieldsStyle()}
            />
            {botLabelComp}
            <Button
              text={this.props.bottomButtonText}
              icon={this.props.bottomButtonIcon}
              style={this.bottomButtonStyle()}
            />
          </View>
        </Image>
      </View>
    );
  }
}

LargeGridItem.propTypes = {
  bottomButtonText: React.PropTypes.any,
  bottomButtonIcon: React.PropTypes.string,
  topLabel: React.PropTypes.any,
  bottomLabel: React.PropTypes.string,
  backgroundImage: React.PropTypes.any,
  infoSeparator: React.PropTypes.any,
  style: React.PropTypes.object,
  infoFields: React.PropTypes.array,
  headline: React.PropTypes.string,
};

const style = {
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
  },
  imageOverlay: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    height: 330,
  },
  h1: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: 'transparent',
  },
  bottomButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  bottomButtonIcon: {
    marginRight: 10,
  },
  bottomButtonText: {
    fontSize: 12,
  },
  topLabel: {},
  bottomLabel: {},
  info: {
    marginBottom: 30,
  },
  infoText: {},
  infoSeparator: {},
};

export default connectStyle('dev.ext.LargeGridItem', style)(LargeGridItem);
