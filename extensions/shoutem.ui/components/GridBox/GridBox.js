import React, {
  View,
  Image,
} from 'react-native';
import { connectStyle } from 'shoutem/theme';

/**
 * LargeGridItem is single list item.
 * Used to show single item in large grid box.
 * Contains, headline, topLabel, bottomLabel, infoFields, bottomButton and backgroundImage.
 * Available properties:
 */
function GridBox({
  style,
  backgroundImage,
  children,
}) {
  return (
    <View style={style.container}>
      <Image
        style={style.backgroundImage}
        source={backgroundImage}
      >
        <View style={style.imageOverlay}>
          {children}
        </View>
      </Image>
    </View>
  );
}

GridBox.propTypes = {
  children: React.PropTypes.element,
  backgroundImage: Image.propTypes.source,
  style: React.PropTypes.object,
};

const style = {
  container: {
  },
  backgroundImage: {
    width: null,
    height: null,
    flex: 1,
  },
  imageOverlay: {
    flex: 1,
  },
};

export default connectStyle('shoutem.ui.GridBox', style)(GridBox);
