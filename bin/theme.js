import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { INCLUDE, createVariations, createSharedStyle } from '@shoutem/theme';
import { getTheme } from '@shoutem/ui';

const window = Dimensions.get('window');

const Colors = {
  DARK: '#333333',
  DARKER: '#222222',
  LIGHT_GRAY: '#f2f2f2',
  LIGHT: '#ffffff',
  BACKGROUND: '#ffffff',
  SCREEN_BACKGROUND: '#f2f2f2',
  SHADOW: '#000000',
  CLEAR: 'rgba(0, 0, 0, 0)',
  OVERLAY: 'rgba(0, 0, 0, 0.2)',
  OVERLAY_DARK: 'rgba(0, 0, 0, 0.4)',
  BUTTON_UNDERLAY: '#cccccc',
  BORDER: '#cccccc',
  SPINNER: '#cccccc',
  DIVIDER_LINE: '#eeeeee',
  DIVIDER_BORDER: 'rgba(51, 51, 51, 0.1)',
  NAVIGATION_TINT: '#333333',
  NAVIGATION_BAR_BORDER: 'rgba(20, 20, 20, 0.2)',

  TEXT: '#666666',
  TITLE: '#222222',
  CAPTION: '#555555',

  INPUT_PLACEHOLDER: '#a7a7a7',
};

const SMALL_GUTTER = 5;
const MEDIUM_GUTTER = 15;
const LARGE_GUTTER = 30;
const EXTRA_LARGE_GUTTER = 45;

const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const NAVIGATION_BAR_HEIGHT = 70;

const sizeVariants = ['', 'left', 'right', 'top', 'bottom', 'horizontal', 'vertical'];
const textComponents = [
  'shoutem.ui.Heading',
  'shoutem.ui.Title',
  'shoutem.ui.Subtitle',
  'shoutem.ui.Text',
  'shoutem.ui.Caption',
];

export default () => ({
  ...getTheme(),

  //
  // Media
  //

  'shoutem.ui.RichMedia': {
    b: {
      [INCLUDE]: ['boldTextStyle'],
    },
    strong: {
      [INCLUDE]: ['boldTextStyle'],
    },
    i: {
      [INCLUDE]: ['italicTextStyle'],
    },
    em: {
      [INCLUDE]: ['italicTextStyle'],
    },
    pre: {
      [INCLUDE]: ['codeTextStyle'],
    },
    code: {
      [INCLUDE]: ['codeTextStyle'],
    },
    a: {
      fontWeight: '500',
      color: '#000',
    },
    h1: {
      color: '#000',
      fontSize: 28,
    },
    h2: {
      color: '#000',
      fontSize: 24,
    },
    h3: {
      fontWeight: '900',
      color: '#000',
      fontSize: 18,
    },
    h4: {
      fontWeight: '700',
      color: '#000',
      fontSize: 16,
    },
    h5: {
      fontWeight: '500',
      color: '#000',
      fontSize: 14,
    },
    video: {
      marginHorizontal: 30,
      container: {
        marginTop: 8,
        marginBottom: 15,
      },
    },
    img: {
      marginHorizontal: 30,
      container: {
        marginTop: 8,
        marginBottom: 15,
      },

      thumbnail: {
        borderRadius: 2,
      },
    },
    gallery: {
      marginHorizontal: 30,
      container: {
        marginTop: 8,
        marginBottom: 15,
      },
    },
    p: {
      [INCLUDE]: ['shoutem.ui.Text', 'multilineTextStyle'],
    },
    div: {
      [INCLUDE]: ['shoutem.ui.Text', 'multilineTextStyle'],
    },
    container: {
      backgroundColor: Colors.BACKGROUND,
      padding: MEDIUM_GUTTER,
    },
  },

  'shoutem.ui.Video': {
    container: {
      backgroundColor: Colors.BACKGROUND,
      flex: 1,
    },
  },

  //
  // Collections
  //
  'shoutem.ui.HorizontalPager': {
    item: {
      flex: 1,
      width: window.width,
    },
  },

  //
  // Other
  //
  'shoutem.ui.ImagePreview': {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    fullScreenContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    image: {
      flex: 1,
    },
    thumbnail: {},
    header: {
      position: 'absolute',
      top: STATUS_BAR_OFFSET,
      left: 0,
      backgroundColor: 'transparent',
    },
    closeIcon: {
      color: 'white',
      marginLeft: 15,
      marginTop: -STATUS_BAR_OFFSET + 20,
    },
  },

  'shoutem.ui.ImageGallery': {
    imagePreview: {
      image: {},
    },
  },

  'shoutem.ui.MapView': {
    flex: 1,
  },

  'shoutem.ui.InlineMap': {
    // TODO: why do we need all image sizes and styles here?
    [INCLUDE]: ['imageSizes'],

    '.top-aligned': {
      justifyContent: 'flex-start',
    },

    '.bottom-aligned': {
      justifyContent: 'flex-end',
    },

    '.medium-tall': {
      height: 160,
    },

    'shoutem.ui.View': {
      'shoutem.ui.View': {
        'shoutem.ui.Overlay': {
          'shoutem.ui.View': {
            'shoutem.ui.Heading': {
              color: 'white',
              marginVertical: 8,
            },

            'shoutem.ui.Title': {
              color: 'white',
              marginVertical: 12,
            },

            'shoutem.ui.Subtitle': {
              color: 'white',
              marginTop: 80,
            },

            'shoutem.ui.Caption': {
              color: 'white',
              marginTop: 5,
            },

            'shoutem.ui.Text': {
              color: 'white',
            },
          },

          alignSelf: 'stretch',
          marginVertical: 0,
        },

        [INCLUDE]: ['fillParent'],
      },
    },

    [INCLUDE]: ['commonVariants'],
    flex: 0,
  },
  'shoutem.navigation.TabBar': {
    'shoutem.ui.Screen': {
      // TabBar container
      'shoutem.ui.View': {
        backgroundColor: '#fff',
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        bottom: 0,
        left: 0,
        right: 0,
      },
      paddingBottom: 60, // TabBar height
    },
  },
  'shoutem.navigation.TabBarItem': {
    'shoutem.ui.Button': {
      'shoutem.ui.Image': {
        height: 24,
        padding: 12,
        width: null,
        flex: 0,
        resizeMode: 'contain',
        marginTop: 8,
        tintColor: Colors.NAVIGATION_TINT,
      },
      'shoutem.ui.Text': {
        color: '#b1b1b1',
        fontSize: 10,
        height: 12,
        marginBottom: 6,
      },

      '.selected': {
        'shoutem.ui.View': {
          'shoutem.ui.Text': {
            color: '#666',
          },
        },
        borderColor: '#222',
      },

      height: 60,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 0,
      borderBottomWidth: 2,
      borderRadius: 0,
      borderColor: 'transparent',
    },
  },
  'shoutem.navigation.Drawer': {
    menu: {
      paddingTop: NAVIGATION_BAR_HEIGHT,
    },
    underlayScreens: {
      paddingTop: NAVIGATION_BAR_HEIGHT,
    },
  },
  'shoutem.navigation.DrawerItem': {
    'shoutem.ui.Row': {
      'shoutem.ui.Button': {
        'shoutem.ui.Image': {
          height: 24,
          padding: 12,
          width: null,
          flex: 0,
          resizeMode: 'contain',
          marginRight: LARGE_GUTTER,
          tintColor: Colors.NAVIGATION_TINT,
        },
        'shoutem.ui.Text': {
          color: '#222',
          fontSize: 15,
          margin: 0,
        },

        '.selected': {
          'shoutem.ui.View': {
            'shoutem.ui.Text': {
              color: '#666',
            },
          },
        },

        borderWidth: 0,
        borderRadius: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        paddingLeft: LARGE_GUTTER,
      },

      height: 30,
      marginBottom: MEDIUM_GUTTER,
      padding: 0,
    },
  },
});
