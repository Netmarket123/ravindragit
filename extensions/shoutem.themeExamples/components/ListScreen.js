import React, {
  View,
  ListView,
} from 'react-native';
import connectStyle from '../theme/StyleConnector';
import LargeGridItemExtended from './LargeGridItem';
import MediumListItem from './MediumListItem';

class ListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.thisRenderRow = this.renderRow.bind(this);
  }

  renderRow(item) {
    const { featureFirst } = this.props;
    this.listCounter += 1;
    if (featureFirst && this.listCounter === 1) {
      return (
        <LargeGridItemExtended
          backgroundImage={item.image}
          headline={item.description.toUpperCase()}
          infoFields={[`$ ${item.currentPrice.toFixed(2)}`]}
          bottomButtonText={'CLAIM COUPON'}
          topLabel={`- ${((item.originalPrice - item.currentPrice) / item.originalPrice) * 100} %`}
          bottomLabel={`$ ${item.originalPrice.toFixed(2)}`}
          style={this.props.style.featuredItem}
        />
      );
    }

    return (
      <MediumListItem
        description={item.description}
        image={item.image}
        leftExtra={`$ ${item.currentPrice.toFixed(2)}`}
        rightExtra={`$ ${item.originalPrice.toFixed(2)}`}
        id={item.id}
        style={this.props.style.items}
      />
    );
  }

  render() {
    const { style, items } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSourceItems = ds.cloneWithRows(items);
    console.log(style);
    this.listCounter = 0;
    return (
      <View style={style.screen}>
        <ListView
          style={style.list}
          dataSource={dataSourceItems}
          renderRow={this.thisRenderRow}
        />
      </View>
    );
  }
}

ListScreen.propTypes = {
  items: React.PropTypes.array,
  style: React.PropTypes.object,
  featureFirst: React.PropTypes.bool,
};


const style = {
  screen: {},
  list: {},
  featuredItem: {},
  items: {},
};
export default connectStyle('dev.ext.ListScreen', style)(ListScreen);
