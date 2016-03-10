const variables = {
  ganetColor: '#961a2d',
};
export default {
  global: {
    baseFont: {
      fontFamily: 'Rubik-Regular',
    },
    buttonText: {
      fontFamily: 'Rubik-Regular',
    },
    leftExtra: {
      fontFamily: 'Rubik-Regular',
    },
    rightExtra: {
      fontFamily: 'Rubik-Regular',
    },
    infoText: {
      fontFamily: 'Rubik-Regular',
    },
    itemDescription: {
      fontFamily: 'Rubik-Regular',
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
  },
  'dev.ext.ListScreen': {
    largeGridItemTopLabel: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: 'rgba(0,0,0,0.5)',
      fontFamily: 'Rubik-Regular',
      fontSize: 25,
      color: '#fff',
      borderRadius: 2,
      marginBottom: 25,
    },
    largeGridItemH1: {
      fontFamily: 'Rubik-Regular',
      fontSize: 20,
      color: '#fff',
    },
    largeGridItemInfo: {
      marginBottom: 10,
      marginTop: 12,
    },
    largeGridItemInfoText: {
      textDecorationLine: 'line-through',
    },
    largeGridItemBottomLabel: {
      fontFamily: 'Rubik-Regular',
      fontSize: 25,
      color: '#fff',
      marginBottom: 20,
    },
    mediumListItemRightExtra: {
      fontSize: 12,
      textDecorationLine: 'line-through',
      color: '#888',
      marginLeft: 15,
    },
  },
  'dev.ext.GanetListScreen': {
    largeGridItemContainer: {
      padding: 15,
      backgroundColor: variables.ganetColor,
    },
    largeGridItemH1: {
      fontFamily: 'Rubik-Regular',
      fontSize: 20,
      color: '#fff',
      marginBottom: 10,
    },
    mediumListItemExtrasSeparator: {
      height: 3,
      width: 3,
      opacity: 0.8,
      marginTop: 3,
      marginHorizontal: 10,
    },
    mediumListItemLeftExtra: {
      fontSize: 12,
      color: '#888',
    },
    mediumListItemRightExtra: {
      fontSize: 12,
      color: '#888',
    },
  },
};
