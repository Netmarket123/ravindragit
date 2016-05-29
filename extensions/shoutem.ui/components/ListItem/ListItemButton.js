import React, {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import GridBox from '../GridBox/GridBox';

const DEFAULT_NUMBER_OF_LINES = 2;

// TODO(Vladimir) - merge with original ListItem when common API is determined
function ListItem({
  style,
  id,
  description,
  leftExtra,
  rightExtra,
  image,
  extrasSeparatorImage,
  onPress,
  numberOfLines,
  fallbackImage,
  renderButton,
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

  return (
    <GridBox style={style.gridBox}>
      <TouchableOpacity style={style.container} onPress={onPress} key={id}>
        <Image style={style.itemImage} source={fallbackImage}>
          <Image style={{ flex: 1 }} source={image} />
        </Image>
        <View style={style.itemInfo}>
          <Text
            numberOfLines={numberOfLines || DEFAULT_NUMBER_OF_LINES}
            style={style.itemTitle}
          >
            {description}
          </Text>
          <View style={style.itemExtras}>
            <Text style={[style.baseFont, style.leftExtra]}>{leftExtra}</Text>
            {separatorImage}
            <Text style={style.rightExtra}>{rightExtra}</Text>
          </View>
        </View>
        {renderButton()}
      </TouchableOpacity>
    </GridBox>
  );
}

ListItem.propTypes = {
  style: React.PropTypes.object,
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  description: React.PropTypes.string,
  leftExtra: React.PropTypes.string,
  rightExtra: React.PropTypes.string,
  image: Image.propTypes.source,
  fallbackImage: Image.propTypes.source,
  extrasSeparatorImage: Image.propTypes.source,
  buttonIcon: React.PropTypes.any,
  onPress: React.PropTypes.func,
  numberOfLines: React.PropTypes.number,
  renderButton: React.PropTypes.func,
};

const style = {
  gridBox: {
  },
  container: {
  },
  itemImage: {
  },
  itemInfo: {
  },
  itemExtras: {
  },
  itemTitle: {
    [INCLUDE]: ['baseFont'],
  },
  extrasSeparator: {
  },
  leftExtra: {
    [INCLUDE]: ['baseFont'],
  },
  rightExtra: {
    [INCLUDE]: ['baseFont'],
  },
};

export default connectStyle('shoutem.ui.ListItem', style)(ListItem);
