import { assert } from 'chai';
import createOpenHomeScreenAction from '../actions';
import sinon from 'sinon';
import layout from './test_data/test-layout';
import children from './test_data/test-children';
import shortcutsData from './test_data/shortcut-data';

describe('openHomeScreenAction', () => {
  const expectedLayout = layout;
  const expectedScreenName = 'shoutem.homeScreen.HomeScreen';
  const testState = shortcutsData;
  const testSettings = {
    homeScreen: {
      layout,
    },
  };

  const navigateToSpy = sinon.spy();
  const openHomeScreenAction = createOpenHomeScreenAction(navigateToSpy);
  openHomeScreenAction(testSettings, children, testState);
  const callParams = navigateToSpy.getCall(0).args[0];

  it('calls navigateTo', () => {
    assert.isTrue(navigateToSpy.called, 'navigateTo not called');
  });

  it('calls navigateTo with correct screen name', () => {
    assert.equal(callParams.screen, expectedScreenName);
  });

  it('calls navigateTo with correct layout in settings', () => {
    assert.deepEqual(callParams.props.settings.layout, expectedLayout);
  });

  const shortcuts = callParams.props.shortcuts;
  it('calls navigateTo with correct number of shortcuts in props', () => {
    assert.equal(shortcuts.length, children.length, 'Number of shortcuts is incorrect');
  });

  describe('navigateTo props shortcut format', () => {
    it('returns a shortcut with no children', () => {
      const expectedShortcut1 = {
        canonicalName: 'shoutem.places.OpenPlacesList',
        title: 'Places',
        iconUrl: 'http://static.shoutem.com/icons/places.png',
        action: 'shoutem.places.OpenPlacesList',
        settings: {
          homeScreen: {
            buttonImages: {
              normal: 'http://static.shoutem.com/...',
              highlighted: 'http://static.shoutem.com/icons/someIcon.png',
            },
          },
        },
        children: [],
      };

      assert.deepEqual(shortcuts[0], expectedShortcut1, 'Shortcut format is not valid');
    });
    it('returns a shortcut with denormalized children', () => {
      const expectedShortcut2 = {
        canonicalName: 'shoutem.places.OpenPlacesList',
        title: 'Places',
        iconUrl: 'http://static.shoutem.com/icons/places.png',
        action: 'shoutem.places.OpenPlacesList',
        settings: {
          homeScreen: {
            buttonImages: {
              normal: 'http://static.shoutem.com/...',
              highlighted: 'http://static.shoutem.com/icons/someIcon.png',
            },
          },
        },
        children: [
          {
            canonicalName: 'shoutem.places.OpenPlacesList',
            title: 'Places',
            iconUrl: 'http://static.shoutem.com/icons/places.png',
            action: 'shoutem.places.OpenPlacesList',
            settings: {
              key: 'value',
            },
            children: [],
          },
        ],
      };

      assert.deepEqual(shortcuts[1], expectedShortcut2, 'Shortcut format is not valid');
    });
  });
});
