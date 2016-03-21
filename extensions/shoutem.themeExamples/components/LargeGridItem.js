import React, {
  Text,
  View,
  Image,
} from 'react-native';
import InfoFields from './InfoFields';
import Button from './Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';


/**
 * LargeGridItem is single list item.
 * Used to show single item in large grid box.
 * Contains, headline, topLabel, bottomLabel, infoFields, bottomButton and backgroundImage.
 * Available properties:
 *  - headline: String
 *  - bottomButtonText: String
 *  - bottomButtonIcon: Image
 *  - topLabelText: String
 *  - bottomLabelText: String
 *  - backgroundImage: Image
 *  - infoSeparator: Image
 *  - infoFields: List<String>
 */
class LargeGridItem extends React.Component {
  render() {
    const { style, topLabelText, bottomLabelText } = this.props;
    const topLabelComp = topLabelText ? <Text style={style.topLabel}>{topLabelText}</Text> : null;
    const bottomLabelComp = bottomLabelText ?
      <Text style={style.bottomLabel}>{bottomLabelText}</Text> : null;

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
            {bottomLabelComp}
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
  bottomButtonText: React.PropTypes.string,
  bottomButtonIcon: React.PropTypes.any,
  topLabelText: React.PropTypes.any,
  bottomLabelText: React.PropTypes.string,
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
  bottomButton: {
    button: {
      backgroundColor: '#fff',
      borderRadius: 2,
    },
    buttonContent: {
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
