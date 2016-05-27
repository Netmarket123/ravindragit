import { bindActionCreators } from 'redux';
import { actions } from '../../index';
import { navigateTo } from 'shoutem/navigation';

export default (dispatch) => ({
  findEvents: bindActionCreators(actions.findEvents, dispatch),
  navigateToRoute: bindActionCreators(navigateTo, dispatch),
});
