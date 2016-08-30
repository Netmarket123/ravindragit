import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Screen,
} from '@shoutem/ui';
import { ScrollDriver, Parallax } from '@shoutem/animation';
import { connect } from 'react-redux';
import { navigatePush } from './navigation/actions';

class RestaurantsList extends Component {
  constructor(props) {
    super(props);
    this.driver = new ScrollDriver();
    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }

  renderRow(restaurant) {
    const { onButtonPress } = this.props;

    return (
      <TouchableOpacity onPress={() => onButtonPress(restaurant)}>
        <Image
          styleName="large-banner"
          source={{ uri: restaurant.image.url }}
        >
          <Tile>
            <Parallax
              driver={this.driver}
              scrollSpeed={1.06}
            >
              <Title styleName="md-gutter-bottom">{restaurant.name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">{restaurant.address}</Subtitle>
            </Parallax>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView {...this.driver.scrollViewProps}>
        <Screen style={{ marginTop: 70 }}>
          <ListView
            data={this.getRestaurants()}
            renderRow={restaurant => this.renderRow(restaurant)}
          />
        </Screen>
      </ScrollView>
    );
  }
}

RestaurantsList.propTypes = {
  onButtonPress: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (restaurant) => {
    dispatch(navigatePush({ key: 'RestaurantDetails', title: '' }, { restaurant }));
  },
});

export default connect(
	undefined,
	mapDispatchToProps
)(RestaurantsList);

