import React, {
  Text,
  Image,
} from 'react-native';
import InfoFields from './InfoFields';
import GridBox from './base/GridBox';
import Button from './Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';

/**
 * EventGridBox used to show single item with shop related properties and actions.
 */
function EventGridItem({
  style,
  infoFields,
  infoSeparator,
  bottomButtonText,
  bottomButtonIcon,
  headline,
}) {
  return (
    <GridBox>
      <Text style={style.headline}>{headline}</Text>
      <InfoFields
        infoFields={infoFields}
        infoSeparator={infoSeparator}
        style={style.infoFields}
      />
      <Image />
      <InfoFields
        infoFields={infoFields}
        infoSeparator={infoSeparator}
        style={style.infoFields}
      />
      <Button
        text={bottomButtonText}
        icon={bottomButtonIcon}
        style={style.button}
      />
    </GridBox>
  );
}

EventGridItem.propTypes = {
  bottomButtonText: React.PropTypes.any,
  bottomButtonIcon: React.PropTypes.string,
  topLabelText: React.PropTypes.string,
  bottomLabelText: React.PropTypes.string,
  backgroundImage: Image.propTypes.source,
  infoSeparator: Image.propTypes.source,
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
  gridBox: {},
};

export default connectStyle('shoutem.ui.EventGridItem', style)(EventGridItem);
