import React, {
  TouchableOpacity,
  Text,
  View,
  ListView,
  Modal,
  Component,
} from 'react-native';

import MaterialIconButton from '../Button/MaterialIconButton';

import { connectStyle, INCLUDE } from 'shoutem/theme';

const RENDER_ROW = Symbol('renderRow');

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.collapse = this.collapse.bind(this);
    this.close = this.close.bind(this);
    this.emitOnItemSelectedEvent = this.emitOnItemSelectedEvent.bind(this);
    this[RENDER_ROW] = this[RENDER_ROW].bind(this);
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
  }

  close() {
    this.setState({ collapsed: false });
  }

  emitOnItemSelectedEvent() {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(this.state.selectedItem);
    }
  }

  [RENDER_ROW](item) {
    const {
      style,
    } = this.props;
    const onPress = () => {
      this.close();
      this.setState({ selectedItem: item }, this.emitOnItemSelectedEvent);
    };
    return (
      <TouchableOpacity onPress={onPress} style={style.modalItem}>
        <Text style={style.modalItemText}>{item[this.state.bindings.text].toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      collapsed,
      selectedItem,
      bindings,
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

    return (
      <View>
        {button}
        <Modal
          visible={collapsed || false}
          onRequestClose={this.close}
          transparent
          animated
        >
          <View style={style.modalContainer}>
            <View style={style.modalItems}>
              <ListView
                dataSource={ds.cloneWithRows(items)}
                renderRow={this[RENDER_ROW]}
              />
            </View>
            <MaterialIconButton iconName="clear" onPress={this.close} style={style.modalCloseButton} />
          </View>
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
  },
  modalItemText: {
    [INCLUDE]: ['baseFont'],
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
      backgroundColor: 'rgba(242, 242, 242, 0.92)',
    },
    buttonIcon: {
      color: 'black',
      fontSize: 18,
    },
  },
};

export default connectStyle('shoutem.ui.DropDownMenu', style)(DropDownMenu);
