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
function LargeGridItem({
  style,
  topLabelText,
  bottomLabelText,
  backgroundImage,
  infoFields,
  infoSeparator,
  bottomButtonText,
  bottomButtonIcon,
  headline,
}) {
  const topLabelComp = topLabelText ?
    <Text style={style.topLabel}>{topLabelText}</Text> : null;

  const bottomLabelComp = bottomLabelText ?
    <Text style={style.bottomLabel}>{bottomLabelText}</Text> : null;

  return (
    <View style={style.container}>
      <Image
        style={style.backgroundImage}
        source={backgroundImage}
      >
        <View style={style.imageOverlay}>
          {topLabelComp}
          <Text style={style.headline}>{headline}</Text>
          <InfoFields
            infoFields={infoFields}
            infoSeparator={infoSeparator}
            style={style.infoFields}
          />
          {bottomLabelComp}
          <Button
            text={bottomButtonText}
            icon={bottomButtonIcon}
            style={style.button}
          />
        </View>
      </Image>
    </View>
  );
}

LargeGridItem.propTypes = {
  bottomButtonText: React.PropTypes.any,
  bottomButtonIcon: React.PropTypes.string,
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
