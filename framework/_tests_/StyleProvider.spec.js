import React, {
  Component,
  Text,
} from 'react-native';

import { assert } from 'chai';
import { mount } from 'enzyme';

import Theme, { ThemeShape } from '../theme/Theme';
import StyleProvider from '../theme/StyleProvider.jsx';

const theme = new Theme({});

class TestComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.theme = context.theme;
  }
  getThemeStyle() {
    return this.theme;
  }
  render() {
    return <Text>Testing StyleProvider</Text>;
  }
}
TestComponent.contextTypes = {
  theme: ThemeShape,
};

// eslint-disable-next-line
class TestStyleProvider extends Component {
  render() {
    return (
      <StyleProvider theme={theme}>
        <TestComponent />
      </StyleProvider>
    );
  }
}

describe('StyleProvider', () => {
  const demo = mount(<TestStyleProvider />);
  const passedTheme = demo.find(TestComponent).nodes[0].getThemeStyle();
  it('provides a theme', () => {
    assert.isTrue(passedTheme instanceof Theme, 'Theme should be available in context');
  });
});
