import React, {
  TouchableOpacity,
  Text,
  View,
  ListView,
  Modal,
  Component,
} from 'react-native';

import Button from '../Button/Button';

import { connectStyle } from 'shoutem/theme';

const RENDER_ROW = Symbol('renderRow');

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.collapse = this.collapse.bind(this);
    this.close = this.close.bind(this);
    this[RENDER_ROW] = this[RENDER_ROW].bind(this);
  }

  componentWillMount() {
    if (!this.props.selectedItem && !this.state.selectedItem) {
      this.setState({ selectedItem: this.props.items[0] });
    }
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

  collapse() {
    this.setState({ collapsed: true });
  }

  close() {
    this.setState({ collapsed: false });
  }

  [RENDER_ROW](item) {
    const {
      style,
      onItemSelected,
    } = this.props;
    const onPress = () => {
      this.setState({ selectedItem: item });
      if (onItemSelected) {
        onItemSelected(item);
      }
      this.close();
    };
    return (
      <TouchableOpacity onPress={onPress} style={style.modalItem}>
        <Text>{item[this.state.bindings.text].toUpperCase()}</Text>
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

    return (
      <View>
        <Button
          iconOnRight
          icon="arrow-drop-down"
          text={selectedItem[bindings.text]}
          onPress={this.collapse}
          style={style.popUpButton}
        />
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
            <Button icon="clear" onPress={this.close} style={style.modalCloseButton} />
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
