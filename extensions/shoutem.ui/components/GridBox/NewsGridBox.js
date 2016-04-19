import React, {
  Text,
  View,
  Image,
} from 'react-native';
import InfoFields from './InfoFields';
import GridBox from './base/GridBox';
import Button from './Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';

/**
 * NewsGridBox used to show single item with news related properties.
 */
function NewsGridBox({
  style,
  infoFields,
  infoSeparator,
  headline,
}) {
  return (
    <GridBox style={style.gridBox}>
      <Text style={style.headline}>{headline}</Text>
      <InfoFields
        infoFields={infoFields}
        infoSeparator={infoSeparator}
        style={style.infoFields}
      />
    </GridBox>
  );
}

NewsGridBox.propTypes = {
  infoSeparator: Image.propTypes.source,
  style: React.PropTypes.object,
  infoFields: React.PropTypes.array,
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
