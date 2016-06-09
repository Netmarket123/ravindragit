import React, {
  TouchableOpacity,
  Text,
  View,
  ListView,
  Modal,
  Component,
  Animated,
  Easing,
} from 'react-native';

import MaterialIconButton from '../Button/MaterialIconButton';
import ShoutemIconButton from '../Button/ShoutemIconButton';

import { connectStyle, INCLUDE } from '@shoutem/theme';

function createModalAnimatedStyle(dropDownAnimation) {
  return {
    opacity: dropDownAnimation,
    transform: [
      {
        scale: dropDownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1],
        }),
      },
    ],
  };
}

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      dropDownAnimation: new Animated.Value(0),
    };
    this.collapse = this.collapse.bind(this);
    this.close = this.close.bind(this);
    this.emitOnItemSelectedEvent = this.emitOnItemSelectedEvent.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.autoSelect(this.props.items, this.props.selectedItem);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.items === this.props.items && nextState === this.state) {
      return false;
    }
    if (!this.state.selectedItem) {
      this.autoSelect(nextProps.items, nextProps.selectedItem);
    }
    return true;
  }

  getValue() {
    const {
      selectedItem,
      bindings,
    } = this.state;

    return selectedItem[bindings.value];
  }

  getSelectedItem() {
    return this.state.selectedItem;
  }

  /**
   * Selects first item as default if non is selected
   */
  autoSelect(items, selectedItem) {
    if (!selectedItem && !this.state.selectedItem && items.length > 0) {
      this.setState({ selectedItem: items[0] }, this.emitOnItemSelectedEvent);
    }
  }

  collapse() {
    this.setState({ collapsed: true });
    Animated.timing(
      this.state.dropDownAnimation,
      {
        toValue: 1,
        easing: Easing.cubic,
        duration: 250,
      }
    ).start();
  }

  close() {
    Animated.timing(
      this.state.dropDownAnimation,
      {
        toValue: 0,
        easing: Easing.cubic,
        duration: 250,
      }
    ).start(() => this.setState({ collapsed: false }));
  }

  emitOnItemSelectedEvent() {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(this.state.selectedItem);
    }
  }

  renderRow(item) {
    const {
      style,
    } = this.props;
    const onPress = () => {
      this.close();
      this.setState({ selectedItem: item }, this.emitOnItemSelectedEvent);
    };
    return (
      <TouchableOpacity onPress={onPress} style={style.modalItem}>
        <Text style={style.modalItemText}>
          {item[this.state.bindings.text].toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      collapsed,
      selectedItem,
      bindings,
      dropDownAnimation,
    } = this.state;
    const { items, style } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const button = selectedItem ? <MaterialIconButton
      showIconOnRight
      iconName="arrow-drop-down"
      text={selectedItem[bindings.text]}
      onPress={this.collapse}
      style={style.popUpButton}
    /> : null;
    const modalAnimatedStyle = createModalAnimatedStyle(dropDownAnimation);

    return (
      <View>
        {button}
        <Modal
          visible={collapsed || false}
          onRequestClose={this.close}
          transparent
        >
          <Animated.View
            style={[
              style.modalContainer,
              modalAnimatedStyle,
            ]}
          >
            <View style={style.modalItems}>
              <ListView
                dataSource={ds.cloneWithRows(items)}
                renderRow={this.renderRow}
              />
            </View>
            <ShoutemIconButton
              iconName="close"
              onPress={this.close}
              style={style.modalCloseButton}
            />
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

DropDownMenu.propTypes = {
  onItemSelected: React.PropTypes.func,
  items: React.PropTypes.array,
  selectedItem: React.PropTypes.any,
  style: React.PropTypes.object,
};

const style = {
  popUpButton: {
    buttonText: {
      color: 'black',
    },
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(242, 242, 242, 0.92)',
  },
  modalItems: {
    alignItems: 'center',
  },
  modalItem: {
    paddingVertical: 23,
    flex: 1,
  },
  modalItemText: {
    [INCLUDE]: ['baseFont'],
    textAlign: 'center',
    flex: 1,
    width: 200,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  modalCloseButton: {
    buttonContainer: {
      position: 'absolute',
      bottom: 65,
      left: 18,
      right: 0,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 18,
      backgroundColor: 'rgba(242, 242, 242, 0)',
      padding: 10,
    },
    buttonIcon: {
      color: 'black',
      fontSize: 24,
    },
  },
};

export default connectStyle('shoutem.ui.DropDownMenu', style)(DropDownMenu);
