import React, {
  Text,
} from 'react-native';
import InfoFields from './InfoFields';
import GridBox from './base/GridBox';
import Button from './Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';

function createEventDates(eventsDetails, eventDetailsSeparator, eventDetailsStyle) {
  const datesListComponents = [];

  eventsDetails.forEach((eventDetails, index) => {
    datesListComponents.push(
      (<InfoFields
        key={index}
        infoFields={eventDetails}
        infoSeparator={eventDetailsSeparator}
        style={eventDetailsStyle}
      />)
    );
  });

  return datesListComponents;
}

/**
 * EventGridBox used to show single item with event related properties and actions.
 */
function EventGridItem({
  style,
  eventDetails,
  eventDetailsSeparator,
  eventSeparator,
  buttonText,
  buttonIcon,
  headline,
}) {
  const eventsDetailsComponents =
    createEventDates(eventDetails, eventDetailsSeparator, style.eventDetails);

  return (
    <GridBox style={style.gridBox}>
      <Text style={style.headline}>{headline}</Text>
      <InfoFields
        fields={eventsDetailsComponents}
        fieldsSeparator={eventSeparator}
        style={style.event}
      />
      <Button
        text={buttonText}
        icon={buttonIcon}
        style={style.button}
      />
    </GridBox>
  );
}

EventGridItem.propTypes = {
  buttonText: React.PropTypes.string,
  buttonIcon: React.PropTypes.string,
  eventSeparator: React.PropTypes.string,
  eventDetails: React.PropTypes.array,
  eventDetailsSeparator: React.PropTypes.string,
  style: React.PropTypes.object,
  headline: React.PropTypes.string,
};

const style = {
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
  eventDetails: {},
  event: {
    info: {
      marginBottom: 30,
    },
  },
  gridBox: {},
};

export default connectStyle('shoutem.ui.EventGridBox', style)(EventGridItem);
