import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { INCLUDE, createVariations, createSharedStyle } from '@shoutem/theme';

const window = Dimensions.get('window');

function generateComponentStyles(components, sharedStyle = {}, customStyles ={}) {

}

const Colors = {
  DARK: '#333333',
  DARKER: '#222222',
  LIGHT_GRAY: '#f2f2f2',
  LIGHT: '#fff',
  BACKGROUND: '#fff',
  SHADOW: '#000',
  CLEAR: 'rgba(0, 0, 0, 0)',
  OVERLAY: 'rgba(0, 0, 0, 0.2)',
  OVERLAY_DARK: 'rgba(0, 0, 0, 0.4)',
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
  'shoutem.ui.Description',
  'shoutem.ui.Text',
  'shoutem.ui.Caption'
];

export default () => ({
  //
  // Common
  //
  guttersPadding: {
    ...createVariations('.sm-gutter', sizeVariants, 'padding', SMALL_GUTTER),
    ...createVariations('.md-gutter', sizeVariants, 'padding', MEDIUM_GUTTER),
    ...createVariations('.lg-gutter', sizeVariants, 'padding', LARGE_GUTTER),
    ...createVariations('.xl-gutter', sizeVariants, 'padding', EXTRA_LARGE_GUTTER),
  },

  guttersMargin: {
    ...createVariations('.sm-gutter', sizeVariants, 'margin', SMALL_GUTTER),
    ...createVariations('.md-gutter', sizeVariants, 'margin', MEDIUM_GUTTER),
    ...createVariations('.lg-gutter', sizeVariants, 'margin', LARGE_GUTTER),
    ...createVariations('.xl-gutter', sizeVariants, 'margin', EXTRA_LARGE_GUTTER),
  },

  commonVariants: {
    '.rounded-corners': {
      borderRadius: 2,
      borderWidth: 0,
      borderColor: 'rgba(0, 0, 0, 0)',
    },
    '.flexible': {
      flex: 1,
    },

    '.collapsible': {
      flex: -1,
    },
  },

  overlayParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  //
  // Text
  //
  defaultFont: {
    fontFamily: 'Rubik-Regular',
  },

  boldTextStyle: {
    fontWeight: '500',
  },

  italicTextStyle: {
    fontStyle: 'italic',
  },

  codeTextStyle: {
    fontFamily: 'Menlo',
  },

  'shoutem.ui.Text': {
    [INCLUDE]: ['commonVariants', 'defaultFont', 'guttersMargin'],

    '.line-through': {
      textDecorationLine: 'line-through',
    },

    '.centered': {
      textAlign: 'center',
    },

    '.bright': {
      color: '#fff',
    },

    '.bold': {
      [INCLUDE]: ['boldTextStyle'],
    },

    color: '#666666',
    fontSize: 15,
    lineHeight: 26,
  },

  'shoutem.ui.Heading': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#222222',
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: 1,
  },

  'shoutem.ui.Title': {
    [INCLUDE]: ['shoutem.ui.Text'],

    '.navigationBarTitle': {
      fontSize: 15,
      lineHeight: 18,
    },

    color: '#222222',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 1,
  },

  'shoutem.ui.Subtitle': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#222222',
    lineHeight: 18,
  },

  'shoutem.ui.Description': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.5,
  },

  'shoutem.ui.Caption': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#555555',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  //
  // Images
  //
  imageChildren: {
    'shoutem.ui.Text': {
      color: 'white',
    },

    'shoutem.ui.Heading': {
      marginVertical: 8,
    },

    'shoutem.ui.Title': {
      marginVertical: 12,
    },

    'shoutem.ui.Icon': {
      '.scroll-indicator': {
        color: 'white',
        fontSize: 32,
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
      },
    },

    'shoutem.ui.View': {
      [INCLUDE]: ['commonVariants'],

      '.actions': {
        'shoutem.ui.Icon': {
          color: 'white',
        },

        '*': {
          marginRight: 0,
          marginVertical: 0,
          marginLeft: 10,
        },

        flex: 0,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
    },
  },
  imageSizes: {
    '.small-avatar': {
      width: 25,
      height: 25,
      borderRadius: 12.5,
      borderWidth: 0,
      resizeMode: 'cover',
    },

    '.small': {
      width: 65,
      height: 65,
    },

    '.medium-avatar': {
      width: 145,
      height: 145,
      borderRadius: 72.5,
      borderWidth: 0,
      resizeMode: 'cover',
    },

    '.medium': {
      width: 145,
      height: 92,
    },

    '.medium-wide': {
      width: (180 / 375) * window.width,
      height: 85,
    },

    '.medium-square': {
      width: 145,
      height: 145,
    },

    // NOTE: Image resizing doesn't work correctly if both
    // dimensions are not explicitly defined, so we can't
    // use flex: 1, or alignSelf: 'stretch' here...

    // TODO (zeljko): See if we can avoid this size
    '.featured': {
      width: (365 / 375) * window.width,
      height: (345 / 375) * window.width,
    },

    '.large': {
      width: window.width,
      height: (280 / 375) * window.width,
    },

    '.large-portrait': {
      width: window.width,
      height: (518 / 375) * window.width,
    },

    '.large-banner': {
      width: window.width,
      height: (200 / 375) * window.width,
    },

    '.large-square': {
      width: window.width,
      height: window.width,
    },

    '.large-wide': {
      width: window.width,
      height: (238 / 375) * window.width,
    },

    // TODO (zeljko): Used only in one place (up next), maybe hardcode it?
    '.large-ultra-wide': {
      width: window.width,
      height: (130 / 375) * window.width,
    },
  },
  'shoutem.ui.Image': {
    [INCLUDE]: ['commonVariants', 'imageSizes'],

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },

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

  //
  // Containers
  //
  'shoutem.ui.View': {
    [INCLUDE]: ['commonVariants', 'guttersPadding'],

    '.horizontal': {
      '.h-center': {
        justifyContent: 'center',
      },

      '.v-center': {
        alignItems: 'center',
      },

      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    '.vertical': {
      '.h-center': {
        alignItems: 'center',
      },

      '.v-center': {
        justifyContent: 'center',
      },

      flexDirection: 'column',
    },

    '.wrap': {
      flexWrap: 'wrap',
    },

    '.space-between': {
      justifyContent: 'space-between',
    },
  },

  'shoutem.ui.Screen': {
    '.full-screen': {
      marginTop: -NAVIGATION_BAR_HEIGHT,
    },

    backgroundColor: Colors.BACKGROUND,
    flex: 1,
  },

  'shoutem.ui.Row': {
    'shoutem.ui.Image': {
      marginRight: 15,
    },

    'shoutem.ui.Icon': {
      '.right': {
        marginRight: 0,
        marginLeft: 15,
      },

      '.disclosure': {
        marginRight: -8,
        marginLeft: 15,
      },

      marginRight: 15,
      padding: 1,
    },

    'shoutem.ui.Button': {
      '.right-icon': {
        marginRight: -10,
        marginLeft: 5,
      },
    },

    'shoutem.ui.View': {
      '.notification-dot': {
        flex: 0,
        width: 6,
        height: 6,
        borderRadius: 3,
        borderColor: '#333333',
        backgroundColor: '#333333',
        marginLeft: -10,
        marginRight: 4,
      },
    },

    '*.top': {
      alignSelf: 'flex-start',
    },

    '.top-aligned': {
      alignItems: 'flex-start',
    },

    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },

  'shoutem.ui.Tile': {
    [INCLUDE]: ['commonVariants'],

    'shoutem.ui.View': {
      '.content': {
        '*': {
          marginBottom: MEDIUM_GUTTER - SMALL_GUTTER,
        },

        alignSelf: 'stretch',
        paddingTop: MEDIUM_GUTTER,
        paddingBottom: SMALL_GUTTER,
        paddingHorizontal: MEDIUM_GUTTER,
      },
    },

    '.light': {
      backgroundColor: Colors.BACKGROUND,
    },

    '.small': {
      'shoutem.ui.View': {
        '.content': {
          '*': {
            marginBottom: SMALL_GUTTER,
          },

          alignSelf: 'stretch',
          paddingTop: MEDIUM_GUTTER,
          paddingBottom: 0,
          paddingHorizontal: 0,
          marginBottom: -SMALL_GUTTER,
        },
      },

      width: 145,
    },

    flex: -1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: Colors.CLEAR,
  },

  'shoutem.ui.Card': {
    [INCLUDE]: ['commonVariants'],

    'shoutem.ui.View.content': {
      'shoutem.ui.Subtitle': {
        marginBottom: MEDIUM_GUTTER,
      },

      padding: 10,
      alignSelf: 'stretch',
    },

    // TODO (zeljko): Can we avoid fixed width here?
    width: (180 / 375) * window.width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 2,
    shadowColor: Colors.SHADOW,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
  },

  'shoutem.ui.Overlay': {
    '.collapsed': {
      '*': {
        marginBottom: 0,
      },

      position: 'relative',
      borderRadius: 2,
      borderWidth: 0,
      paddingTop: 2 * SMALL_GUTTER,
      paddingBottom: 2 * SMALL_GUTTER,
      paddingHorizontal: MEDIUM_GUTTER,
      backgroundColor: Colors.OVERLAY_DARK,
    },

    '.solid-light': {
      ...createSharedStyle(textComponents, {
        color: Colors.DARKER,
      }),

      borderRadius: 0,
      backgroundColor: Colors.BACKGROUND,
    },

    'shoutem.ui.View': {
      '.actions': {
        'shoutem.ui.Button': {
          'shoutem.ui.Icon': {
            color: Colors.LIGHT,
          },
        },

        position: 'absolute',
        top: MEDIUM_GUTTER,
        right: 0,
      },
    },

    '*': {
      marginBottom: SMALL_GUTTER,
    },

    ...createSharedStyle(textComponents, {
      color: Colors.LIGHT,
      textAlign: 'center',
    }),

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: SMALL_GUTTER,
    backgroundColor: Colors.OVERLAY,
  },

  //
  // Buttons
  //
  'shoutem.ui.TouchableOpacity': {
    activeOpacity: 0.8,
  },

  'shoutem.ui.Button': {
    [INCLUDE]: ['commonVariants', 'guttersMargin'],

    'shoutem.ui.Text': {
      '.regular': {
        fontFamily: 'Rubik-Regular',
        margin: 0,
      },

      fontFamily: 'Rubik-Medium',
      fontSize: 12,
      color: Colors.DARK,
      letterSpacing: 1,
      lineHeight: null,
      marginVertical: 12,
      marginRight: 10,
    },

    'shoutem.ui.Icon': {
      fontSize: 24,
      marginRight: 10,
    },

    '.clear': {
      'shoutem.ui.Icon': {
        marginHorizontal: 0,
      },

      backgroundColor: Colors.CLEAR,
      borderWidth: 0,
      borderRadius: 0,
    },

    '.dark': {
      [INCLUDE]: ['commonVariants'],

      'shoutem.ui.Icon': {
        color: Colors.LIGHT,
      },
      'shoutem.ui.Text': {
        color: Colors.LIGHT,
      },

      backgroundColor: Colors.DARK,
    },

    '.stacked': {
      'shoutem.ui.Icon': {
        color: '#666666',
        fontSize: 32,
      },

      'shoutem.ui.Text': {
        [INCLUDE]: ['defaultFont'],
        fontSize: 13,
        margin: 10,
      },

      width: 125,
      flexDirection: 'column',
      paddingTop: 10,
      paddingBottom: SMALL_GUTTER,
    },

    underlayColor: '#ccc',

    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: MEDIUM_GUTTER,
    paddingRight: SMALL_GUTTER,
  },

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
      [INCLUDE]: ['shoutem.ui.Text'],
    },
    div: {
      [INCLUDE]: ['shoutem.ui.Text'],
    },
    container: {
      margin: MEDIUM_GUTTER,
    },
  },

  'shoutem.ui.Video': {
    container: {
      flex: 1,
    },
  },

  roundedOverlay: {
    backgroundColor: Colors.LIGHT,
    color: Colors.DARKER,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0,
    // Rounded corners don't work if
    // element is opaque
    opacity: 0.99,
    padding: 12,
  },
  'shoutem.ui.Icon': {
    '.rounded-overlay-small': {
      [INCLUDE]: ['roundedOverlay'],
      width: 34,
      height: 34,
      borderRadius: 17,
      padding: 4,
    },

    '.rounded-overlay': {
      [INCLUDE]: ['roundedOverlay'],
    },

    backgroundColor: Colors.CLEAR,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
  },

  //
  // Collections
  //
  'shoutem.ui.ListView': {
    'shoutem.ui.Divider': {
      'shoutem.ui.View': {
        'shoutem.ui.Caption': {
          marginVertical: SMALL_GUTTER,
          marginHorizontal: MEDIUM_GUTTER,
        },
      },

      backgroundColor: 'white',
      paddingTop: 20,
      flex: 0,
      height: null,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgb(242, 242, 242)',
    },

    header: {
      container: {},
    },
    list: {},
    listContent: {
      paddingBottom: SMALL_GUTTER,
    },
    tintColor: {
      // uses only background color
      backgroundColor: '#ccc',
    },
    newDataSpinner: {},
    loadMoreSpinner: {
      paddingVertical: 25,
    },
  },

  'shoutem.ui.GridView': {
    header: {
      container: {},
      search: {},
    },
    listContent: {},
    list: {},
    gridRow: {
      container: {
        flexDirection: 'row',
      },
      gridItemCell: {
        flex: 1,
      },
    },
  },

  'shoutem.ui.GridRow': {
    '*': {
      flex: 1,
      alignSelf: 'stretch',
      marginLeft: SMALL_GUTTER,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    },

    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingRight: SMALL_GUTTER,
    paddingTop: SMALL_GUTTER,
  },

  'shoutem.ui.DropDownMenu': {
    '.horizontal': {
      container: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
      },
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'rgba(242, 242, 242, 0.97)',
    },
    modalItems: {
      alignItems: 'center',
    },
    modalItem: {
      paddingVertical: 23,
      flex: 1,
    },
    modalItemText: {
      fontFamily: 'Rubik-Regular',
      textAlign: 'center',
      flex: 1,
      fontSize: 16,
      width: 200,
      paddingHorizontal: 20,
      alignSelf: 'center',
    },

    modalCloseButton: {
      button: {
        position: 'absolute',
        bottom: 65,
        left: 18,
        right: 0,
      },
      buttonIcon: {
        color: 'black',
        fontSize: 24,
      },
    },
  },

  'shoutem.ui.HorizontalPager': {
    item: {
      flex: 1,
      width: window.width,
    },
  },

  //
  // Other
  //
  'shoutem.ui.NavigationBar': {
    '.clear': {
      'shoutem.ui.Title': {
        color: 'white',
      },
      'shoutem.ui.Icon': {
        color: 'white',
      },
      'shoutem.ui.Button': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        'shoutem.ui.Icon': {
          color: 'white',
        },
      },
      container: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
      },
    },
    'shoutem.ui.Title': {
      fontSize: 15,
      lineHeight: 18,
    },
    'shoutem.ui.Icon': {
      color: 'black',
      fontSize: 24,
    },
    'shoutem.ui.Text': {
      color: 'black',
    },
    container: {
      height: 70,
      top: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      backgroundColor: 'white',
      borderBottomColor: 'rgb(242, 242, 242)',
      borderBottomWidth: 1,
      padding: 15,
    },
    componentsContainer: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
    component: {
      height: 24,
      marginBottom: -8,
      alignSelf: 'flex-end',
      flex: 1,
    },
    leftComponent: {
      alignItems: 'flex-start',
      flex: 1,
    },
    centerComponent: {
      alignItems: 'center',
      flex: 1,
    },
    rightComponent: {
      alignItems: 'flex-end',
      flex: 1,
    },
  },

  'shoutem.ui.Spinner': {
    android: {
      height: 20,
    },
    ios: {
    },
  },

  'shoutem.ui.Divider': {
    '.line': {
      height: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgb(242, 242, 242)',
    },

    '.medium-vertical-margin': {
      marginVertical: MEDIUM_GUTTER,
    },

    '.section-header': {
      'shoutem.ui.View': {
        'shoutem.ui.Caption': {
          marginVertical: SMALL_GUTTER,
          marginHorizontal: MEDIUM_GUTTER,
          color: '#888888',
        },
      },

      backgroundColor: '#f2f2f2',
      paddingTop: 20,
      flex: 0,
      height: null,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#e5e5e5',
    },

    alignSelf: 'stretch',
    height: 20,
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

        [INCLUDE]: ['overlayParent'],
      },
    },

    [INCLUDE]: ['commonVariants'],
    flex: 0,
  },
});
