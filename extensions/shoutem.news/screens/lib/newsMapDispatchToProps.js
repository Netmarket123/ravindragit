import { bindActionCreators } from 'redux';
import { clear } from 'redux-api-state';
import { actions } from '../../index';
import { SHOUTEM_NEWS_SCHEME } from '../../actions';
import { navigateTo } from 'shoutem/navigation';

export default (dispatch) => ({
  clearSearch: bindActionCreators(() => clear(SHOUTEM_NEWS_SCHEME, 'searchedNews'), dispatch),
  findNews: bindActionCreators(actions.findNews, dispatch),
  navigateToRoute: bindActionCreators(navigateTo, dispatch),
});
