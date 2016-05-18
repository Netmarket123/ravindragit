import { bindActionCreators } from 'redux';
import { clear } from '@shoutem/redux-api-state';
import { actions } from '../../index';
import { SHOUTEM_EVENTS_SCHEME } from '../../actions';
import { navigateTo } from 'shoutem/navigation';

export default (dispatch) => ({
  clearSearch: bindActionCreators(() => clear(SHOUTEM_EVENTS_SCHEME, 'searchedEvents'), dispatch),
  findEvents: bindActionCreators(actions.findEvents, dispatch),
  navigateToRoute: bindActionCreators(navigateTo, dispatch),
});
