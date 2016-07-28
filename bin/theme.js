import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { INCLUDE, createVariations } from '@shoutem/theme';

const window = Dimensions.get('window');

const SMALL_GUTTER = 5;
const MEDIUM_GUTTER = 15;
const LARGE_GUTTER = 30;
const EXTRA_LARGE_GUTTER = 45;

const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const NAVIGATION_BAR_HEIGHT = 70;

const sizeVariants = ['', 'left', 'right', 'top', 'bottom', 'horizontal', 'vertical'];

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
    '.flexible': {
      flex: 1,
    },

    '.collapsible': {
      flex: -1,
    },
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

    color: '#555555',
    fontSize: 14,
  },

  'shoutem.ui.Heading': {
    [INCLUDE]: ['shoutem.ui.Text'],
    color: '#222222',
    fontSize: 25,
  },

  'shoutem.ui.Title': {
    [INCLUDE]: ['shoutem.ui.Text'],

    '.navigationBarTitle': {
      fontSize: 15,
      lineHeight: 18,
    },

    color: '#222222',
    fontSize: 20,
    lineHeight: 24,
  },

  'shoutem.ui.Subtitle': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#222222',
    fontSize: 15,
  },

  'shoutem.ui.Caption': {
    [INCLUDE]: ['shoutem.ui.Text'],

    color: '#555555',
    fontSize: 12,
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
  'shoutem.ui.Image': {
    [INCLUDE]: ['imageChildren', 'guttersPadding'],

    'shoutem.ui.Overlay': {
      'shoutem.ui.View': {
        [INCLUDE]: ['imageChildren'],
      },

      alignSelf: 'stretch',
      marginVertical: -33,
      marginHorizontal: -33,
      paddingVertical: 33,
      paddingHorizontal: 33,
    },

    '.small-avatar': {
      width: 25,
      height: 25,
      borderRadius: 13,
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      resizeMode: 'cover',
    },

    '.small': {
      width: 65,
      height: 65,
    },

    '.medium': {
      width: 145,
      height: 92,
    },

    '.medium-square': {
      width: 145,
      height: 145,
    },

    '.large': {
      width: 375,
      height: 240,
    },

    '.large-portrait': {
      width: 375,
      height: (518 / 375) * window.width,
    },

    '.large-square': {
      flex: 1,
      height: (330 / 375) * window.width,
    },

    '.large-wide': {
      width: 375,
      height: 200,
    },

    '.rounded-corners': {
      borderRadius: 2,
      borderWidth: 0,
      borderColor: 'rgba(0, 0, 0, 0)',
    },

    '.top-aligned': {
      justifyContent: 'flex-start',
    },

    '.bottom-aligned': {
      justifyContent: 'flex-end',
    },

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    padding: 33,
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
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    '.vertical': {
      'shoutem.ui.View': {
        marginBottom: 5,
      },

      flexDirection: 'column',
      alignSelf: 'stretch',
    },

    '.wrapped': {
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },

    '.collapsed': {
      flex: 0,
      justifyContent: 'flex-start',
    },

    flex: 1,
    justifyContent: 'space-between',
  },

  'shoutem.ui.Screen': {
    '.full-screen': {
      marginTop: -NAVIGATION_BAR_HEIGHT,
    },

    backgroundColor: '#fff',
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

    'shoutem.ui.Image': {
      'shoutem.ui.Icon': {
        color: 'white',
      },

      'shoutem.ui.Heading': {
        marginVertical: 8,
      },

      'shoutem.ui.Title': {
        marginVertical: 12,
        textAlign: 'center',
      },

      'shoutem.ui.Caption': {
        marginTop: 5,
      },

      'shoutem.ui.Button': {
        marginVertical: 12,
      },

      'shoutem.ui.View': {
        '.actions': {
          marginTop: -18,
          marginRight: -18,
          marginBottom: 15,
        },
      },

      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      resizeMode: 'cover',
      padding: 33,
    },

    'shoutem.ui.Subtitle': {
      paddingTop: 15,
    },

    'shoutem.ui.Caption': {
      paddingTop: 5,
    },

    '*.content': {
      '*': {
        marginTop: 10,
      },

      marginTop: 5,
      marginBottom: 15,
      marginHorizontal: 15,
    },

    '.light': {
      backgroundColor: 'white',
    },

    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  'shoutem.ui.Card': {
    [INCLUDE]: ['commonVariants'],

    '*.content': {
      padding: 10,
      alignSelf: 'stretch',
    },

    'shoutem.ui.Image': {
      '.medium-wide': {
        height: (85.0 / 375) * window.width,
      },

      alignSelf: 'stretch',
      padding: 15,
    },

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
  },

  'shoutem.ui.Overlay': {
    '.solid-light': {
      'shoutem.ui.View': {
        'shoutem.ui.Heading': {
          color: 'black',
        },

        'shoutem.ui.Title': {
          color: 'black',
        },

        'shoutem.ui.Subtitle': {
          color: 'black',
        },

        'shoutem.ui.Text': {
          color: 'black',
        },

        'shoutem.ui.Caption': {
          color: 'black',
        },
      },

      backgroundColor: 'white',
    },

    'shoutem.ui.View': {
      'shoutem.ui.Heading': {
        color: 'white',
      },

      'shoutem.ui.Title': {
        color: 'white',
      },

      'shoutem.ui.Subtitle': {
        color: 'white',
      },

      'shoutem.ui.Text': {
        color: 'white',
      },

      'shoutem.ui.Caption': {
        color: 'white',
      },
    },

    '.dark': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(85, 85, 85, 0.5)',
  },

  //
  // Buttons
  //
  'shoutem.ui.TouchableOpacity': {
    activeOpacity: 0.8,
  },

  'shoutem.ui.Button': {
    [INCLUDE]: ['commonVariants'],

    'shoutem.ui.Text': {
      fontFamily: 'Rubik-Medium',
      fontSize: 12,
      color: 'black',
      margin: 12,
    },

    'shoutem.ui.Icon': {
      fontSize: 24,
      marginHorizontal: 10,
    },

    '.clear': {
      'shoutem.ui.Icon': {
        color: 'white',
        marginHorizontal: 0,
      },

      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 0,
      borderRadius: 0,
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
      lineHeight: 26,
      color: '#666666',
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

  'shoutem.ui.Icon': {
    '.rounded-overlay': {
      backgroundColor: '#333333',
      color: 'white',
      opacity: 0.7,
      fontSize: 24,
      width: 38,
      height: 38,
      borderRadius: 19,
      padding: 7,
    },

    backgroundColor: 'rgba(0, 0, 0, 0)',
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
          paddingVertical: SMALL_GUTTER,
          paddingHorizontal: MEDIUM_GUTTER,
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
      container: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
      },
      defaultBackButton: {
        'shoutem.ui.Icon': {
          color: 'white',
        },
      },
      rightComponent: {
        'shoutem.ui.Button': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          'shoutem.ui.Icon': {
            color: 'white',
          },
        },
      },
      centerComponent: {
        'shoutem.ui.Title': {
          color: 'white',
        },
      },
    },
    backgroundImage: {
      padding: 15,
      backgroundColor: 'transparent',
      height: 70,
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
    },
    componentsContainer: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    component: {
      height: 24,
      marginBottom: -8,
      alignSelf: 'flex-end',
      flex: 1,
    },
    leftComponent: {
      alignItems: 'flex-start',
    },
    centerComponent: {
      alignItems: 'center',
    },
    rightComponent: {
      alignItems: 'flex-end',
    },
    defaultBackButton: {
      'shoutem.ui.Icon': {
        color: 'black',
        fontSize: 24,
      },
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
});
