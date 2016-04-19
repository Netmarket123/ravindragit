import React, {
  Text,
} from 'react-native';
import InfoFields from '../InfoFields/InfoFields';
import GridBox from './GridBox';
import { connectStyle, INCLUDE } from 'shoutem/theme';

/**
 * NewsGridBox used to show single item with news related properties.
 */
function NewsGridBox({
  style,
  newsDetails,
  newsDetailsSeparator,
  headline,
}) {
  return (
    <GridBox style={style.gridBox}>
      <Text style={style.headline}>{headline}</Text>
      <InfoFields
        fields={newsDetails}
        fieldsSeparator={newsDetailsSeparator}
        style={style.infoFields}
      />
    </GridBox>
  );
}

NewsGridBox.propTypes = {
  newsDetailsSeparator: React.PropTypes.string,
  style: React.PropTypes.object,
  newsDetails: React.PropTypes.array,
  headline: React.PropTypes.string,
};

const style = {
  headline: {
    textAlign: 'center',
    fontSize: 25,
    [INCLUDE]: ['h1'],
  },
  infoFields: {
    info: {
      marginBottom: 30,
    },
  },
  gridBox: {},
};

export default connectStyle('shoutem.ui.NewsGridBox', style)(NewsGridBox);
