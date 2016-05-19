import React from 'react-native';
import { DropDownMenu } from 'shoutem.ui';

export default function NewsCategoriesDropDown({
  categories,
  selectedCategory,
  onCategorySelect,
  style,
}) {
  return (<DropDownMenu
    items={categories}
    bindings={{ text: 'name', value: 'id' }}
    onItemSelected={onCategorySelect}
    selectedItem={selectedCategory}
    style={style}
  />);
}

NewsCategoriesDropDown.propTypes = {
  // currently selected category
  selectedCategory: React.PropTypes.object,
  // categories array to display
  categories: React.PropTypes.array,
  // custom NewsCategoriesDropDown style
  style: React.PropTypes.object,
  // callback function when category is selected
  onCategorySelect: React.PropTypes.func,
};
