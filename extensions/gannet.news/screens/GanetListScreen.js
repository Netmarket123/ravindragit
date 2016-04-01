import React, {
  View,
  ListView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';

import connectStyle from 'shoutem/theme/StyleConnector';
import { LargeGridItem, MediumListItem } from 'shoutem.ui';
import { navigateTo } from 'shoutem/navigation';

class GannettListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      extrasSeparator: require('../assets/circle_grey.png'),
    };
    this.thisRenderRow = this.renderRow.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
  }

  openDetailsScreen(item) {
    const { dispatch } = this.props;
    const route = { screen: 'gannet.news.GannettDetailsScreen', props: { item: item } }

    dispatch(navigateTo(route));
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
        onPress={() => { this.openDetailsScreen(item) }}
      />
    );
  }

  render() {
    const { style, items } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSourceItems = ds.cloneWithRows(items);
    const navBarTtile = <Text style={style.h1}>News</Text>;
    this.listCounter = 0;
    this.props.setNavBarProps({
      centerComponent: navBarTtile,
    })
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
  dispatch: React.PropTypes.func,
};

const style = {
  screen: {},
  h1: {},
  list: {},
  featuredItem: {},
  items: {},
};

export default connect()(connectStyle('dev.ext.GannettListScreen', style)(GannettListScreen));
