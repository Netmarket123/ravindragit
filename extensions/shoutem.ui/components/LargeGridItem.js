import React, {
  Text,
  View,
  Image,
} from 'react-native';
import InfoFields from './InfoFields';
import Button from './Button';
import connectStyle from 'shoutem/theme/StyleConnector';
import { INCLUDE } from 'shoutem/theme/StyleIncluder';

class LargeGridItem extends React.Component {
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
            <Text style={style.headline}>{this.props.headline}</Text>
            <InfoFields
              infoFields={this.props.infoFields}
              infoSeparator={this.props.infoSeparator}
              style={style.infoFields}
            />
            {botLabelComp}
            <Button
              text={this.props.bottomButtonText}
              icon={this.props.bottomButtonIcon}
              style={style.button}
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
  horizontal_layout: {},
  container: {
    height: 330,
  },
  headline: {
    textAlign: 'center',
    fontSize: 25,
    [INCLUDE]: ['h1'],
  },
  button: {
    buttonContainer: {
      backgroundColor: '#fff',
      borderRadius: 2,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 9,
    },
    buttonIcon: {
      marginRight: 10,
    },
    buttonText: {
      fontSize: 12,
    },
  },
  topLabel: {},
  bottomLabel: {},
  infoFields: {
    info: {
      marginBottom: 30,
    },
  },
};

export default connectStyle('dev.ext.LargeGridItem', style)(LargeGridItem);
