import React, {
  Text,
  Image,
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
  backgroundImage,
}) {
  return (
    <GridBox style={style.gridBox} backgroundImage={backgroundImage}>
      <Text style={style.title} numberOfLines={4}>{headline}</Text>
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
  backgroundImage: Image.propTypes.source,
};

const style = {
  title: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 22,
    lineHeight: 25,
    fontWeight: '500',
    [INCLUDE]: ['h1'],
  },
  infoFields: {
    info: {
      marginBottom: 30,
      marginTop: 15,
    },
    fieldText: {
      fontSize: 12,
      color: '#fff',
      backgroundColor: 'transparent',
    },
  },
  gridBox: {},
};

export default connectStyle('shoutem.ui.NewsGridBox', style)(NewsGridBox);
