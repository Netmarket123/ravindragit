export const EXT = 'shoutem.news';

export const Screens = {
  ArticlesGridScreen: `${EXT}.ArticlesGridScreen`,
  ArticlesListScreen: `${EXT}.ArticlesListScreen`,
  ArticleDetailsScreen: `${EXT}.ArticleDetailsScreen`,
};

export const Collections = {
  LatestNews: 'latestNews',
  NewsCategories: 'newsCategories',
};

// TODO(Braco) - move core schemas to shoutem cms/core extensions
export const DataSchemas = {
  Articles: `${EXT}.articles`,
  Categories: 'shoutem.core.categories',
  Images: 'shoutem.core.image-attachments',
};
