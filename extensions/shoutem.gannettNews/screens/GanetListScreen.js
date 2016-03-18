import React, {
  View,
  ListView,
} from 'react-native';
import connectStyle from 'shoutem/theme/StyleConnector';
import LargeGridItem from './LargeGridItem';
import MediumListItem from './MediumListItem';

class GannettListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.thisRenderRow = this.renderRow.bind(this);
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
          style={this.props.style.featuredItem}
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
        style={this.props.style.items}
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
        <ListView
          style={style.list}
          dataSource={dataSourceItems}
          renderRow={this.thisRenderRow}
        />
      </View>
    );
  }
}

GannettListScreen.propTypes = {
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

export default connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen);
