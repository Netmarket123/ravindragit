import React, {
  View,
  ListView,
} from 'react-native';
import { INCLUDE, connectStyle } from 'shoutem/theme';
import LargeGridItem from './LargeGridItem';
import MediumListItem from './MediumListItem';

const CREATE_DATA_SOURCE = Symbol('createDataSource');

class GannettListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.renderRow = this.renderRow.bind(this);
  }

  [CREATE_DATA_SOURCE](items) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows(items);
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
    this.listCounter = 0;
    return (
      <View style={style.screen}>
        <ListView
          style={style.list}
          dataSource={this[CREATE_DATA_SOURCE](items)}
          renderRow={this.renderRow}
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
  toInclude: {
    color: 'red',
  },
  screen: {},
  list: {},
  featuredItem: {},
  items: {
    itemDescription: {
      [INCLUDE]: ['toInclude'],
    },
  },
};

export default connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen);
