import isSearch from './isSearch';

export default function fetchEvents(queryParams, isLoadMore) {
  const { settings, findEvents, clearSearch, searchedEvents } = this.props;
  let offset;
  if (
    !isSearch(queryParams.searchTerm, queryParams.selectedCategory) &&
    searchedEvents.length > 0
  ) {
    clearSearch();
  }

  if (isLoadMore) {
    offset = 1;
  }

  if (isLoadMore) {
    return undefined;
  }

  return findEvents(queryParams.searchTerm, queryParams.selectedCategory, offset, settings);
}
