import { INCLUDE } from 'shoutem/theme';

export default (variables) => ({
  baseFont: {
    fontFamily: 'Rubik-Regular',
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
  screen: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 70,
  },
  'shoutem.ui.NewsGridBox.photoCentric': {
    gridBox: {
      container: {
        flex: 1,
        backgroundColor: variables.brandColor,
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
      fontSize: 12,
      color: '#888',
    },
    rightExtra: {
      fontSize: 12,
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
      height: 90,
      position: 'relative',
    },
    itemExtras: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: 0,
      alignItems: 'center',
    },
    itemTitle: {
      flex: 1,
      fontSize: 16,
      lineHeight: 20,
      color: variables.brandColor,
      marginHorizontal: 10,
      marginTop: 10,
    },
    extrasSeparator: {
      width: 3,
      height: 3,
      marginTop: 3,
      marginHorizontal: 10,
    },
    leftExtra: {
      fontSize: 12,
      marginHorizontal: 10,
      marginBottom: 10,
      color: '#888',
    },
    rightExtra: {
      fontSize: 12,
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
    },
    featuredItem: {
      gridBox: {
        container: {
          backgroundColor: '#fff',
        },
      },
      headline: {
        fontSize: 22,
        lineHeight: 25,
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
    detailsContainer: {
      paddingTop: 30,
    },
    detailsTitle: {
      color: variables.brandColor,
    },
    dateSeparator: {
      backgroundColor: variables.brandColor,
    },
    timeText: {
      color: variables.brandColor,
    },
    sectionTitle: {
      fontSize: 12,
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
