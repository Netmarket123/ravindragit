import isSearch from './isSearch';

export default function fetchNew(queryParams, isLoadMore) {
  const { settings, findNews, clearSearch, searchedNews } = this.props;
  let offset;
  if (
    !isSearch(queryParams.searchTerm, queryParams.selectedCategory) &&
    searchedNews.length > 0
  ) {
    clearSearch();
  }

  if (isLoadMore) {
    offset = 1;
  }

  if (isLoadMore) {
    return undefined;
  }

  return findNews(queryParams.searchTerm, queryParams.selectedCategory, offset, settings);
}
