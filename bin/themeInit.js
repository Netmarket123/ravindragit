import { INCLUDE } from 'shoutem/theme';

export default (variables) => ({
  baseFont: {
    color: '#fff',
  },
  h1: {
    [INCLUDE]: ['baseFont'],
    fontSize: 25,
  },
  list: {
    position: 'relative',
    flex: 1,
  },
  screen: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  'shoutem.ui.ListItem.textCentric': {
    gridBox: {
      container: {
        width: screenWidth,
      },
      imageOverlay: {
        flexDirection: 'column',
      },
    },
    container: {
      padding: 15,
      flexDirection: 'row',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      height: 95,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    itemImage: {
      width: 65,
      height: null,
      borderRadius: 2,
      marginRight: 15,
      resizeMode: 'cover',
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
    itemDescription: {
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
      fontSize: 15,
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
      container: {
        margin: 5,
        width: (screenWidth / 2) - (2 * 2 * 5),
      },
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
      height: 200,
      alignItems: 'stretch',
      alignSelf: 'stretch',
    },
    itemImage: {
      alignSelf: 'stretch',
      height: 85,
      borderRadius: 2,
      marginBottom: 5,
    },
    itemInfo: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 90,
      position: 'relative',
    },
    itemExtras: {
      flexDirection: 'row',
      bottom: 0,
      alignItems: 'center',
    },
    itemDescription: {
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
  'shoutem.ui.NavigationBar': {
    container: {
      backgroundColor: '#ccc',
    },
  },
  'shoutem.test.ExampleScreen': {
    button: {
      backgroundColor: variables.testColor,
    },
  },
  'dev.ext.GannettListScreen': {
    featuredItem: {
      container: {
        padding: 30,
        backgroundColor: variables.ganetColor,
      },
      headline: {
        marginBottom: 30,
      },
    },
  },
});
