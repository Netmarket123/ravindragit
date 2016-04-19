import React, {
  Text,
} from 'react-native';
import GridBox from './base/GridBox';
import Button from './Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';

/**
 * ShopGridBox used to show single item with shop related properties and actions.
 */
function ShopGridBox({
  style,
  priceLabel,
  specialLabel,
  buttonText,
  buttonIcon,
  headline,
}) {
  const priceLabelComp = priceLabel ?
    <Text style={style.priceLabel}>{priceLabel}</Text> : null;

  const specialLabelComp = specialLabel ?
    <Text style={style.specialLabel}>{specialLabel}</Text> : null;

  return (
    <GridBox style={style.gridBox}>
      <Text style={style.headline}>{headline}</Text>
      {priceLabelComp}
      {specialLabelComp}
      <Button
        text={buttonText}
        icon={buttonIcon}
        style={style.button}
      />
    </GridBox>
  );
}

ShopGridBox.propTypes = {
  buttonText: React.PropTypes.string,
  buttonIcon: React.PropTypes.string,
  priceLabel: React.PropTypes.oneOf([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  specialLabel: React.PropTypes.oneOf([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
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
  priceLabel: {},
  specialLabel: {},
  gridBox: {},
};

export default connectStyle('shoutem.ui.ShopGridBox', style)(ShopGridBox);
