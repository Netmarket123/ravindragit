import { INCLUDE } from 'shoutem/theme';

export default (variables) => ({
  baseFont: {
    fontFamily: 'Work Sans',
  },
  h1: {
    [INCLUDE]: ['baseFont'],
    color: '#fff',
    fontSize: 25,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBarTextColor: {
    color: variables.brandColor,
  },
  navigationBarTitle: {
    [INCLUDE]: ['navigationBarTextColor'],
    fontSize: 15,
    fontWeight: '500',
  },
  screen: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 70,
  },
  'shoutem.ui.DropDownMenu': {
    popUpButton: {
      buttonText: {
        [INCLUDE]: ['baseFont'],
        fontWeight: '500',
        fontSize: 15,
      },
    },
  },
  'shoutem.ui.NewsGridBox.photoCentric': {
    gridBox: {
      container: {
        flex: 1,
      },
      contentWrapper: {
        justifyContent: 'center',
      },
    },
  },
  'shoutem.ui.NewsGridBox.textCentric': {
    gridBox: {
      container: {
        height: 280,
      },
      contentWrapper: {
        justifyContent: 'center',
      },
    },
  },
  'shoutem.ui.ListItem.textCentric': {
    gridBox: {
      imageOverlay: {
        flexDirection: 'column',
      },
    },
    container: {
      backgroundColor: '#fff',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      height: 95,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
      overflow: 'hidden',
    },
    itemImage: {
      width: 65,
      height: null,
      marginRight: 15,
      resizeMode: 'cover',
      borderRadius: 2,
    },
    itemInfo: {
      flexDirection: 'column',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      position: 'relative',
    },
    itemExtras: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      bottom: 0,
      alignItems: 'center',
    },
    itemTitle: {
      [INCLUDE]: ['baseFont'],
      flex: 1,
      fontSize: 15,
      color: '#222',
    },
    extrasSeparator: {
      width: 3,
      height: 3,
      marginTop: 3,
      marginHorizontal: 10,
    },
    leftExtra: {
      [INCLUDE]: ['baseFont'],
      fontSize: 12,
      fontWeight: '500',
      color: '#888',
    },
    rightExtra: {
      [INCLUDE]: ['baseFont'],
      fontSize: 12,
      fontWeight: '500',
      color: '#888',
    },
    mediumListItemButton: {
      button: {
        alignSelf: 'stretch',
      },
    },
  },
  'shoutem.ui.ListItem.photoCentric': {
    gridBox: {
      imageOverlay: {
        alignItems: 'stretch',
        flexDirection: 'row',
      },
    },
    container: {
      flex: 1,
      padding: 0,
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      shadowColor: 'black',
      shadowRadius: 9,
      shadowOpacity: 0.3,
      shadowOffset: { width: 5, height: 7 },
    },
    itemImage: {
      alignSelf: 'stretch',
      height: 85,
      width: null,
    },
    itemInfo: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      position: 'relative',
    },
    itemExtras: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 10,
      flex: 1,
    },
    itemTitle: {
      height: 60,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      color: variables.brandColor,
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 16,
    },
    extrasSeparator: {
      width: 3,
      height: 3,
      marginTop: 3,
      marginHorizontal: 10,
    },
    leftExtra: {
      fontSize: 12,
      fontFamily: 'Rubik-Regular',
      color: '#888',
    },
    rightExtra: {
      fontSize: 12,
      fontFamily: 'Rubik-Regular',
      color: '#888',
    },
    mediumListItemButton: {
      button: {
        alignSelf: 'stretch',
      },
    },
  },
  'shoutem.ui.AdvancedListView': {
    header: {
      search: {
        container: {
          paddingHorizontal: 7,
          backgroundColor: variables.brandColor,
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        input: {
          flex: 1,
          height: 30,
          paddingHorizontal: 5,
          borderRadius: 4,
          backgroundColor: '#fff',
          alignSelf: 'center',
        },
        clearButton: {
          container: {
            height: 30,
          },
          buttonText: {
            paddingHorizontal: 5,
            textAlign: 'center',
          },
        },
      },
    },
  },
  'shoutem.ui.NavigationBar': {
    container: {
      backgroundColor: '#fff',
    },
    defaultBackButton: {
      buttonIcon: {
        color: variables.brandColor,
      },
    },
  },
  'shoutem.test.ExampleScreen': {
    button: {
      backgroundColor: variables.brandColor,
    },
  },
  'shoutem.ui.RichMedia': {
    p: {
      [INCLUDE]: ['baseFont'],
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
    },
    a: {
      color: variables.brandColor,
    },
  },
  'shoutem.news.GridScreen': {
    gridView: {
      header: {
        search: {
          container: {
            backgroundColor: '#fff',
          },
        },
      },
    },
    navigation: {
      navigationBar: {
        backgroundImage: {
          backgroundColor: '#fff',
        },
      },
      categoriesDropDown: {
        popUpButton: {
          buttonText: {
            fontWeight: '500',
          },
        },
      },
      navigationBarTitle: {
        [INCLUDE]: ['navigationBarTitle'],
      },
    },
    featuredItem: {
      gridBox: {
        container: {
          backgroundColor: '#fff',
        },
      },
      infoFields: {
        fieldText: {
          fontSize: 13,
          fontWeight: '500',
        },
      },
      headline: {
        fontSize: 22,
        lineHeight: 25,
        fontWeight: '500',
        marginHorizontal: 35,
      },
    },
  },
  'shoutem.news.DetailsScreen': {
    headline: {
      headline: {
        fontSize: 22,
        lineHeight: 25,
      },
    },
  },
  'shoutem.events.ListScreen': {
    categoriesDropDown: {
      popUpButton: {
        buttonText: {
          [INCLUDE]: ['baseFont'],
          fontWeight: '500',
          fontSize: 15,
        },
      },
    },
    navigation: {
      navigationBarTitle: {
        [INCLUDE]: ['navigationBarTitle'],
      },
    },
  },
  'shoutem.events.DetailsScreen': {
    button: {
      buttonContainer: {
        backgroundColor: variables.brandColor,
      },
    },
    shareButton: {
      buttonIcon: {
        [INCLUDE]: ['navigationBarTextColor'],
      },
    },
    detailsTitle: {
      color: variables.brandColor,
      fontWeight: '500',
      fontSize: 22,
      lineHeight: 25,
      paddingHorizontal: 40,
    },
    dateSeparator: {
      backgroundColor: variables.brandColor,
      width: 174,
    },
    timeText: {
      color: variables.brandColor,
      fontSize: 13,
    },
    sectionTitle: {
      [INCLUDE]: ['baseFont'],
      fontSize: 12,
      fontWeight: '600',
    },
    sectionSeparator: {
      borderTopColor: '#e5e5e5',
      borderBottomColor: '#e5e5e5',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    detailsText: {
      padding: 15,
      [INCLUDE]: ['baseFont'],
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
    },
  },
});
