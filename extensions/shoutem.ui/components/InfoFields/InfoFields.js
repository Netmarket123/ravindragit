import React, {
  View,
  Text,
} from 'react-native';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * InfoFields is List component.
 * Available props:
 *  - fields: List<String> - string to be listed
 *  - fieldsSeparator: String (name) - icon between strings
 */
function InfoFields({
  fields,
  fieldsSeparator,
  style,
}) {
  const infoFieldsComponents = [];
  if (fields && fields.length > 0) {
    fields.forEach((info, i) => {
      if (i > 0 && fieldsSeparator) {
        infoFieldsComponents.push(
          <Icon
            style={style.fieldsSeparator}
            name={fieldsSeparator}
            key={`separator${i}`}
          />
        );
      }
      infoFieldsComponents.push(
        <Text
          style={style.fieldText}
          key={i}
        >
          {info}
        </Text>
      );
    });
    return <View style={style.info}>{infoFieldsComponents}</View>;
  }
  return null;
}

InfoFields.propTypes = {
  fields: React.PropTypes.array,
  fieldsSeparator: React.PropTypes.string,
  style: React.PropTypes.object,
};

const style = {
  fieldsSeparator: {
    flex: 1,
  },
  fieldText: {
    [INCLUDE]: ['baseFont'],
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default connectStyle('dev.ext.InfoFields', style)(InfoFields);
