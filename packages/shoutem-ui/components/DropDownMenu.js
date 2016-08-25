import React, {
  Component,
} from 'react';
import {
  Modal,
  ListView,
} from 'react-native';

import { Button } from './Button';
import { Icon } from './Icon';
import { Text } from './Text';
import { View } from './View';
import { TouchableOpacity } from './TouchableOpacity';

import { connectStyle } from '@shoutem/theme';

import {
  ScrollDriver,
  TimingDriver,
  FadeIn,
  FadeOut,
  ZoomOut,
} from '@shoutem/animation';

class DropDownMenu extends Component {
  static propTypes = {
    /**
     * callback that is called when dropdown option is selected
     */
    onOptionSelected: React.PropTypes.func,
    /**
     * collection of objects which will be shown as options in DropDownMenu
     */
    options: React.PropTypes.array,
    /**
     * initially selected option
     */
    selectedOption: React.PropTypes.any,
    /**
     * key name that represents option's string value
     */
    titleProperty: React.PropTypes.string.isRequired,
    /**
     * key name that represents option's value
     */
    valueProperty: React.PropTypes.string.isRequired,
    /**
     * number of options shown without scroll
     */
    visibleOptions: React.PropTypes.number,
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      optionHeight: 82,
    };
    this.collapse = this.collapse.bind(this);
    this.close = this.close.bind(this);
    this.emitOnOptionSelectedEvent = this.emitOnOptionSelectedEvent.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onOptionLayout = this.onOptionLayout.bind(this);
    this.defaultVisibleOptions = 8;
  }

  componentWillMount() {
    this.autoSelect(this.props.options, this.props.selectedOption);
    this.scrollDriver = new ScrollDriver();
    this.timingDriver = new TimingDriver();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedOption && nextProps.options.length > 0) {
      this.autoSelect(nextProps.options, nextProps.selectedOption);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.options !== this.props.options) ||
      (nextState !== this.state);
  }

  onOptionLayout(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({ optionHeight: height });
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
    this.scrollDriver = new ScrollDriver();
    this.timingDriver.setValue(1);
  }

  close() {
    this.timingDriver.setValue(0, () => this.setState({ collapsed: false }));
  }

  emitOnOptionSelectedEvent() {
    if (this.props.onOptionSelected) {
      this.props.onOptionSelected(this.state.selectedOption);
    }
  }

  renderRow(option, sectionId, rowId) {
    const {
      style,
      titleProperty,
      visibleOptions = this.defaultVisibleOptions,
    } = this.props;
    const { optionHeight } = this.state;
    const optionPosition = rowId * optionHeight;
    // start to fade in option when option is scrolled in
    const fadeInStart = optionPosition - (visibleOptions - 0.5) * optionHeight;
    const fadeInEnd = optionPosition - (visibleOptions - 1.5) * optionHeight;
    const onPress = () => {
      this.close();
      this.setState({ selectedOption: option }, this.emitOnOptionSelectedEvent);
    };
    return (
      <TouchableOpacity onPress={onPress} style={style.modalItem} onLayout={this.onOptionLayout}>
        <FadeOut
          inputRange={[optionPosition, optionPosition + optionHeight / 2]}
          driver={this.scrollDriver}
        >
          {/* there should be visible only initial visibleOptions options */}
          <FadeIn
            inputRange={[fadeInStart, fadeInEnd]}
            driver={this.scrollDriver}
          >
            <Text>
              {option[titleProperty].toUpperCase()}
            </Text>
          </FadeIn>
        </FadeOut>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      collapsed,
      selectedOption,
      titleProperty,
      optionHeight,
    } = this.state;
    const { options, style, visibleOptions = this.defaultVisibleOptions } = this.props;
    const listViewHeight = options.length > visibleOptions ?
      visibleOptions * optionHeight : options.length * optionHeight;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const button = selectedOption ? (
      <Button onPress={this.collapse} styleName="clear" style={style.selectedOption}>
        <Text>{selectedOption[titleProperty]}</Text>
        <Icon name="drop-down" />
      </Button>
    ) : null;

    return (
      <View renderToHardwareTextureAndroid>
        {button}
        <Modal
          visible={collapsed || false}
          onRequestClose={this.close}
          transparent
        >
          <ZoomOut driver={this.timingDriver} maxFactor={1.1} style={{ flex: 1 }}>
            <FadeIn driver={this.timingDriver} style={{ flex: 1 }}>
              <View style={style.modal} styleName="vertical">
                <ListView
                  dataSource={ds.cloneWithRows(options.filter((option) => option[titleProperty]))}
                  renderRow={this.renderRow}
                  {...this.scrollDriver.scrollViewProps}
                  style={{ flex: 0, height: listViewHeight }}
                />
                <Button onPress={this.close} styleName="clear close">
                  <Icon name="close" />
                </Button>
              </View>
            </FadeIn>
          </ZoomOut>
        </Modal>
      </View>
    );
  }
}

const StyledDropDownMenu = connectStyle('shoutem.ui.DropDownMenu', {})(DropDownMenu);

export {
  StyledDropDownMenu as DropDownMenu,
};
