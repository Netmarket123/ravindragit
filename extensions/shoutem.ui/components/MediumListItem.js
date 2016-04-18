import React, {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';
import Button from './Button';

/**
 * Used to show single list item.
 * Contains description, image, leftExtra, rightExtra, extraSeparator & button.
 * Available properties:
 *  - id: Number
 *  - description: String
 *  - leftExtra: String
 *  - rightExtra: String
 *  - image: Image
 *  - extrasSeparatorImage: Image
 *  - buttonIcon: Image
 */
function MediumListItem({
  style,
  id,
  description,
  leftExtra,
  rightExtra,
  image,
  extrasSeparatorImage,
  buttonIcon,
  onPressItem,
  onPressMethod,
}) {
  let separatorImage = null;
  if (extrasSeparatorImage) {
    separatorImage = (
      <Image
        style={style.extrasSeparator}
        source={extrasSeparatorImage}
      />
    );
  }

  function onPress() {
    if (!onPressMethod) {
      return;
    }

    onPressMethod(onPressItem);
  }

  return (
    <TouchableOpacity onPress={onPress} key={id}>
      <View style={style.container}>
        <Image style={style.itemImage} source={image} />
        <View style={style.itemInfo}>
          <Text style={[style.baseFont, style.itemDescription]}>
            {description}
          </Text>
          <View style={style.itemExtras}>
            <Text style={[style.baseFont, style.leftExtra]}>{leftExtra}</Text>
            {separatorImage}
            <Text style={style.rightExtra}>{rightExtra}</Text>
          </View>
        </View>
        <Button style={style.mediumListItemButton} icon={buttonIcon} />
      </View>
    </TouchableOpacity>
  );
}

MediumListItem.propTypes = {
  style: React.PropTypes.object,
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  description: React.PropTypes.string,
  leftExtra: React.PropTypes.string,
  rightExtra: React.PropTypes.string,
  image: Image.propTypes.source,
  extrasSeparatorImage: Image.propTypes.source,
  buttonIcon: React.PropTypes.any,
  onPressItem: React.PropTypes.any,
  onPressMethod: React.PropTypes.func,
};

const style = {
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    height: 95,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 65,
    height: null,
    borderRadius: 2,
    marginRight: 15,
    resizeMode: 'cover',
  },
  itemInfo: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  itemExtras: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    bottom: 0,
    alignItems: 'center',
  },
  itemDescription: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  extrasSeparator: {
    width: 3,
    height: 3,
  },
  leftExtra: {
    fontSize: 15,
  },
  rightExtra: {
    fontSize: 15,
  },
  mediumListItemButton: {
    button: {
      alignSelf: 'stretch',
    },
  },
};

export default connectStyle('dev.ext.MediumListItem', style)(MediumListItem);
