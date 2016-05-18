import { SHOUTEM_NEWS_EXT_NAME } from '../../index';

export default (state, collectionName = 'latestNews') => {
  const news = state[SHOUTEM_NEWS_EXT_NAME].news; // storage
  const newsCollection = [];

  // latestNews = collection
  state[SHOUTEM_NEWS_EXT_NAME][collectionName].forEach(id => {
    const item = news[id];
    if (!item) {
      return;
    }
    newsCollection.push(news[id]);
  });

  return newsCollection;
};
