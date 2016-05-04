import { bindActionCreators } from 'react-redux';
import { clear } from 'redux-api-state';
import findNews from './findNews';
import { SHOUTEM_NEWS_SCHEME } from '../../actions';
import { navigateTo } from 'shoutem/navigation';

export default (dispatch) => ({
  clearSearch: bindActionCreators(() => clear(SHOUTEM_NEWS_SCHEME, 'searchedNews'), dispatch),
  findNews: bindActionCreators(findNews, dispatch),
  navigateToRoute: bindActionCreators(navigateTo, dispatch),
});
