import React, {} from 'react-native';
import _ from 'lodash';
import GiftedListView from 'react-native-gifted-listview';
import { connectStyle } from 'shoutem/theme';

function getPropsToPass(props) {
  // we do not want to pass style to GiftedListView, it uses customStyle
  const formattedProps = _.omit(props, ['style']);
  formattedProps.customStyle = props.style;
  return formattedProps;
}

function ShoutemListView(props) {
  let scrolled = false;
  let listView = null;

  return (<GiftedListView
    ref={(ref) => {
      if (!ref || scrolled) {
        return;
      }

      scrolled = true;
      listView = ref.refs.listview;
      listView.scrollTo({ y: props.style.search.height });

      if (props.registerScrollRef) {
        props.registerScrollRef(listView);
      }
    }}
    firstLoader // display a loader for the first fetching
    pagination // enable infinite scrolling using touch to load more
    refreshable // enable pull-to-refresh for iOS and touch-to-refresh for Android
    withSections={false} // enable sections
    refreshableTintColor="blue"
    enableEmptySections
    {...getPropsToPass(props)}
  />);
}

ShoutemListView.propTypes = {
  style: React.PropTypes.object,
  search: React.PropTypes.boolean,
  renderRow: React.PropTypes.function,
  registerScrollRef: React.PropTypes.function,
  onFetch: React.PropTypes.function,
};

export default connectStyle('shoutem.ui.ListView', {})(ShoutemListView);
