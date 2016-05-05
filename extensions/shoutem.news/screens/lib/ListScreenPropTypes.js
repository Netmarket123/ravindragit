import React from 'react-native';

export default {
  findNews: React.PropTypes.func,
  clearSearch: React.PropTypes.func,
  news: React.PropTypes.array,
  searchedNews: React.PropTypes.array,
  style: React.PropTypes.object,
  setNavBarProps: React.PropTypes.func,
  navigateToRoute: React.PropTypes.func,
};
