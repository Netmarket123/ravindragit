import React from 'react-native';
import { DropDownMenu } from 'shoutem.ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewsCategories, SHOUTEM_CATEGORIES_SCHEME } from '../actions';
import { ReduxApiStateDenormalizer } from '@shoutem/redux-api-state';
import { SHOUTEM_NEWS_EXT_NAME } from '../index';

class NewsCategoriesDropDownMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    props.getNewsCategories();
  }

  onCategorySelect(category) {
    if (this.props.categorySelected) {
      // if "All" selected, emit null as selectedCategory
      this.props.categorySelected(category.id ? category : null);
    }
  }

  render() {
    const { categories, selectedCategory } = this.props;
    const clearCategoriesFilter = { name: 'All', id: null };

    return (<DropDownMenu
      items={[clearCategoriesFilter].concat(categories)}
      bindings={{ text: 'name', value: 'id' }}
      onItemSelected={this.onCategorySelect}
      selectedItem={selectedCategory}
    />);
  }
}

NewsCategoriesDropDownMenu.propTypes = {
  categories: React.PropTypes.array,
  selectedCategory: React.PropTypes.object,
  getNewsCategories: React.PropTypes.func,
  categorySelected: React.PropTypes.func,
};

function mapStateToProps(state) {
  const denormalizer = new ReduxApiStateDenormalizer();
  return {
    categories: denormalizer.denormalizeCollection(
      state[SHOUTEM_NEWS_EXT_NAME].newsCategories,
      SHOUTEM_CATEGORIES_SCHEME,
      { [SHOUTEM_CATEGORIES_SCHEME]: state[SHOUTEM_NEWS_EXT_NAME].categories }
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNewsCategories: bindActionCreators(getNewsCategories, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategoriesDropDownMenu);
