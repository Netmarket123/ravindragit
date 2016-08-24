import React, {
  Component,
} from 'react';
import {
  TouchableOpacity,
  ListView,
  Modal,
  Animated,
  Easing,
} from 'react-native';

import { Button } from './Button';
import { Icon } from './Icon';
import { Text } from './Text';
import { View } from './View';

import { connectStyle } from '@shoutem/theme';

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
  static propTypes = {
    onOptionSelected: React.PropTypes.func,
    options: React.PropTypes.array,
    selectedOption: React.PropTypes.any,
    titleProperty: React.PropTypes.string,
    valueProperty: React.PropTypes.any,
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      dropDownAnimation: new Animated.Value(0),
    };
    this.collapse = this.collapse.bind(this);
    this.close = this.close.bind(this);
    this.emitOnOptionSelectedEvent = this.emitOnOptionSelectedEvent.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.autoSelect(this.props.items, this.props.selectedOption);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedOption && nextProps.items.length > 0) {
      this.autoSelect(nextProps.items, nextProps.selectedOption);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.items !== this.props.items) ||
      (nextState !== this.state);
  }

  getValue() {
    const {
      selectedOption,
      valueProperty,
    } = this.state;

    return selectedOption[valueProperty];
  }

  getSelectedOption() {
    return this.state.selectedOption;
  }

  /**
   * Selects first item as default if non is selected
   */
  autoSelect(options, selectedOption) {
    if (!selectedOption && !this.state.selectedOption && options.length > 0) {
      this.setState({ selectedOption: options[0] }, this.emitOnOptionSelectedEvent);
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

  emitOnOptionSelectedEvent() {
    if (this.props.onOptionSelected) {
      this.props.onOptionSelected(this.state.selectedOption);
    }
  }

  renderRow(option) {
    const {
      style,
      titleProperty,
    } = this.props;
    const onPress = () => {
      this.close();
      this.setState({ selectedOption: option }, this.emitOnOptionSelectedEvent);
    };
    return (
      <TouchableOpacity onPress={onPress} style={style.modalItem}>
        <Text style={style.modalItemText}>
          {option[titleProperty].toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      collapsed,
      selectedOption,
      titleProperty,
      dropDownAnimation,
    } = this.state;
    const { options, style } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const button = selectedOption ? (
      <Button onPress={this.collapse} styleName="clear selectedOption">
        <Text>{selectedOption[titleProperty]}</Text>
        <Icon name="drop-down" />
      </Button>
    ) : null;
    const modalAnimatedStyle = createModalAnimatedStyle(dropDownAnimation);
    return (
      <View style={style.container} renderToHardwareTextureAndroid>
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
                dataSource={ds.cloneWithRows(options.filter((option) => option[titleProperty]))}
                renderRow={this.renderRow}
              />
            </View>
            <Button onPress={this.close} styleName="clear close">
              <Icon name="close" />
            </Button>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

const StyledDropDownMenu = connectStyle('shoutem.ui.DropDownMenu', {})(DropDownMenu);

export {
  StyledDropDownMenu as DropDownMenu,
};
