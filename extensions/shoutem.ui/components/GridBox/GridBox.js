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
 *  - headline: String
 *  - bottomButtonText: String
 *  - bottomButtonIcon: Image
 *  - topLabelText: String
 *  - bottomLabelText: String
 *  - backgroundImage: Image
 *  - infoSeparator: Image
 *  - infoFields: List<String>
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
  children: React.propTypes.children,
  backgroundImage: Image.propTypes.source,
  style: React.PropTypes.object,
};

const style = {
  container: {
    height: 330,
  },
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
  header: {},
  body: {},
  footer: {},
};

export default connectStyle('shoutem.ui.GridBox', style)(GridBox);
