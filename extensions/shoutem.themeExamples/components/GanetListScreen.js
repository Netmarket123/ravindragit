import React, {
  View,
  ListView,
} from 'react-native';
import { connectStyle } from 'shoutem/theme/ThemeHelpers';
import LargeGridItem from './LargeGridItem';
import MediumListItem from './MediumListItem';
import { NavigationBar } from 'shoutem.ui';

class GanetListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.thisRenderRow = this.renderRow.bind(this);
  }

  mediumListItemStyle() {
    const style = this.props.style;
    return {
      container: style.mediumListItemContainer,
      itemImage: style.mediumListItemImage,
      itemInfo: style.mediumListItemInfo,
      itemExtras: style.mediumListItemExtras,
      itemDescription: style.mediumListItemDescription,
      extrasSeparator: style.mediumListItemExtrasSeparator,
      leftExtra: style.mediumListItemLeftExtra,
      rightExtra: style.mediumListItemRightExtra,
      buttonContainer: style.mediumListItemButtonContainer,
      button: style.mediumListItemButton,
      buttonIcon: style.mediumListItemButtonIcon,
      buttonText: style.mediumListItemButtonText,
    };
  }

  largeGridItemStyle() {
    const style = this.props.style;
    return {
      backgroundImage: style.largeGridItemBackgroundImage,
      container: style.largeGridItemContainer,
      h1: style.largeGridItemH1,
      bottomButtonContainer: style.largeGridItemBottomButtonContainer,
      bottomButton: style.largeGridItemBottomButton,
      bottomButtonIcon: style.largeGridItemBottomButtonIcon,
      bottomButtonText: style.largeGridItemBottomButtonText,
      topLabel: style.largeGridItemTopLabel,
      bottomLabel: style.largeGridItemBottomLabel,
      info: style.largeGridItemInfo,
      infoText: style.largeGridItemInfoText,
      infoSeparator: style.largeGridItemInfoSeparator,
    };
  }

  renderRow(item) {
    const { featureFirst } = this.props;
    this.listCounter += 1;
    if (featureFirst && this.listCounter === 1) {
      return (
        <LargeGridItem
          backgroundImage={item.image}
          headline={item.description.toUpperCase()}
          infoFields={[item.source, item.date]}
          style={this.largeGridItemStyle()}
        />
      );
    }

    return (
      <MediumListItem
        description={item.description}
        image={item.image}
        extrasSeparatorImage={this.state.extrasSeparator}
        leftExtra={item.source}
        rightExtra={item.date}
        id={item.id}
        style={this.mediumListItemStyle()}
      />
    );
  }

  render() {
    const { style, items } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSourceItems = ds.cloneWithRows(items);
    this.listCounter = 0;
    return (
      <View style={style.screen}>
      <NavigationBar />
        <ListView
          style={[style.list, { marginTop: 70 }]}
          dataSource={dataSourceItems}
          renderRow={this.thisRenderRow}
        />
      </View>
    );
  }
}

GanetListScreen.propTypes = {
  items: React.PropTypes.array,
  style: React.PropTypes.object,
  featureFirst: React.PropTypes.bool,
};

const style = {
  screen: {},
  list: {},
  mediumListItemRightExtra: {},
  mediumListItemContainer: {},
  mediumListItemImage: {},
  mediumListItemInfo: {},
  mediumListItemExtras: {},
  mediumListItemDescription: {},
  mediumListItemExtrasSeparator: {},
  mediumListItemLeftExtra: {},
  mediumListItemBaseFont: {},
  mediumListItemButtonContainer: {},
  mediumListItemButton: {},
  mediumListItemButtonIcon: {},
  mediumListItemButtonText: {},
  largeGridItemBackgroundImage: {},
  largeGridItemContainer: {},
  largeGridItemH1: {},
  largeGridItemBottomButtonContainer: {},
  largeGridItemBottomButton: {},
  largeGridItemBottomButtonIcon: {},
  largeGridItemBottomButtonText: {},
  largeGridItemInfo: {},
  largeGridItemInfoText: {},
  largeGridItemInfoSeparator: {},
  largeGridItemTopLabel: {},
  largeGridItemBottomLabel: {},
};

export default connectStyle('dev.ext.GanetListScreen', style)(GanetListScreen);
