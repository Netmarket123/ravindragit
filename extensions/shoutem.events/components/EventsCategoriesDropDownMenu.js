import React from 'react-native';
import { DropDownMenu } from 'shoutem.ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventsCategories, SHOUTEM_CATEGORIES_SCHEME } from '../actions';
import { ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { SHOUTEM_EVENTS_EXT_NAME } from '../index';

class EventsCategoriesDropdownMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  onCategorySelect(category) {
    this.props.categorySelected(category);
  }

  render() {
    const { categories, selectedCategory, style } = this.props;

    return (<DropDownMenu
      items={categories}
      bindings={{ text: 'name', value: 'id' }}
      onItemSelected={this.onCategorySelect}
      selectedItem={selectedCategory}
      style={style}
    />);
  }
}

EventsCategoriesDropdownMenu.propTypes = {
  settings: React.PropTypes.object,
  parentCategoryId: React.PropTypes.any,
  categories: React.PropTypes.array,
  selectedCategory: React.PropTypes.object,
  getEventsCategories: React.PropTypes.func,
  categorySelected: React.PropTypes.func,
  style: React.PropTypes.object,
};

function mapStateToProps(state) {
  const denormalizer = new ReduxApiStateDenormalizer();
  return {
    categories: denormalizer.denormalizeCollection(
      state[SHOUTEM_EVENTS_EXT_NAME].eventsCategories,
      SHOUTEM_CATEGORIES_SCHEME,
      { [SHOUTEM_CATEGORIES_SCHEME]: state[SHOUTEM_EVENTS_EXT_NAME].categories }
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getEventsCategories: bindActionCreators(getEventsCategories, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsCategoriesDropdownMenu);
