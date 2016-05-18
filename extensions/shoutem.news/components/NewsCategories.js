import React from 'react-native';
import { DropDownMenu } from 'shoutem.ui';

export default function NewsCategories({
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
};
