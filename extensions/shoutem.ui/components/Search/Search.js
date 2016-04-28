import React, {
  View,
  TextInput,
} from 'react-native';
import Button from '../Button/Button';
import { connectStyle } from 'shoutem/theme';

const DEFAULT_SEARCH_PLACEHOLDER = 'Search';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearTextInput = this.clearTextInput.bind(this);
    this.state = {
      text: '',
    };
  }

  onSubmit() {
    if (!this.state.text) {
      if (this.props.onCleared) {
        this.props.onCleared();
      }
      return;
    }
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
      <Button onPress={this.clearTextInput} style={style.clearButton} text="Clear" /> :
      null;

    return (<View style={style.container}>
      <TextInput
        placeholder={placeholder || DEFAULT_SEARCH_PLACEHOLDER}
        style={style.input}
        onChangeText={this.updateSearchTerm}
        value={currentText}
        keyboardType="web-search"
        onSubmitEditing={this.onSubmit}
      />
      {button}
    </View>);
  }
}

Search.propTypes = {
  style: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  onSearchTermChange: React.PropTypes.func,
  onCleared: React.PropTypes.func,
};

const style = {
  container: {},
  input: {},
  clearButton: {},
};

export default connectStyle('shoutem.ui.Search', style)(Search);
