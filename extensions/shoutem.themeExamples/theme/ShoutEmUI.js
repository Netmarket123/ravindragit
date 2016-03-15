const variables = {
  ganetColor: '#961a2d',
}
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
    h1: {
      color: 'yellow',
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
  'dev.ext.LargeGridItem': {
    h1: {
      //color: 'green',
    },
    button: {
      buttonText: {
      },
    },
  },
  'dev.ext.ListScreen': {
    featuredItem: {
      topLabel: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        fontFamily: 'Rubik-Regular',
        fontSize: 25,
        color: '#fff',
        borderRadius: 2,
        marginBottom: 25,
      },
      h1: {
        fontFamily: 'Rubik-Regular',
        fontSize: 20,
        //color: '#fff',
      },
      bottomLabel: {
        fontFamily: 'Rubik-Regular',
        fontSize: 25,
        color: '#fff',
        marginBottom: 20,
      },
      infoFields: {
        info: {
          marginBottom: 10,
          marginTop: 12,
        },
        infoText: {
          textDecorationLine: 'line-through',
        },
      },
    },
    items: {
      rightExtra: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: '#888',
        marginLeft: 15,
      },
    },
  },
  'dev.ext.GannettListScreen': {
    featuredItem: {
      container: {
        padding: 30,
        backgroundColor: variables.ganetColor,
      },
      h1: {
        fontFamily: 'Rubik-Regular',
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
      },
    },
    items: {
      rightExtra: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: '#888',
      },
      extrasSeparator: {
        height: 3,
        width: 3,
        opacity: 0.8,
        marginTop: 3,
        marginHorizontal: 10,
      },
    },
  },
}
