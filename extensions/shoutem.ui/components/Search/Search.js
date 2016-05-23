import React, {
  View,
  TextInput,
} from 'react-native';
import Button from '../Button/Button';
import { connectStyle, INCLUDE } from 'shoutem/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEFAULT_SEARCH_PLACEHOLDER = 'Search';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearTextInput = this.clearTextInput.bind(this);
    this.state = {
      text: props.searchTerm,
    };
  }

  onSubmit() {
    if (this.props.onSearchTermChange) {
      this.props.onSearchTermChange(this.state.text);
    }
  }

  updateSearchTerm(text) {
    this.setState({ text });
  }

  clearTextInput() {
    this.setState({
      text: '',
    });
    this.onSubmit();
  }

  render() {
    const {
      style,
      placeholder,
    } = this.props;
    const {
      text: currentText,
    } = this.state;

    const button = currentText ?
      <Button
        onPress={this.clearTextInput}
        style={style.clearButton}
        iconType={Button.iconTypes.AWESOME_ICON}
        icon="times-circle"
        style={style.clearButton}
      /> : null;

    return (<View style={style.container}>
      <TextInput
        placeholder={placeholder || DEFAULT_SEARCH_PLACEHOLDER}
        style={style.input}
        onChangeText={this.updateSearchTerm}
        value={currentText}
        keyboardType="web-search"
        onSubmitEditing={this.onSubmit}
      />
      <View style={style.searchIconContainer}>
        <Icon
          name="search"
          style={style.searchIcon}
        />
      </View>
      {button}
    </View>);
  }
}

Search.propTypes = {
  style: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  searchTerm: React.PropTypes.string,
  onSearchTermChange: React.PropTypes.func,
};

const style = {
  container: {
    position: 'relative',
  },
  input: {
    paddingLeft: 27,
    color: '#888',
    [INCLUDE]: ['baseFont'],
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: 8,
  },
  searchIcon: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#888',
    opacity: 0.5,
  },
  clearButton: {
    buttonContainer: {
      position: 'absolute',
      right: 5,
      height: 40,
      width: 50,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonIcon: {
      color: '#2c2c2c',
      opacity: 0.5,
      fontSize: 20,
    },
  },
};

export default connectStyle('shoutem.ui.Search', style)(Search);
