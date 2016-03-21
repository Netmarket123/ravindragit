import { INCLUDE } from 'shoutem/theme';

export default (variables) => ({
  baseFont: {
    fontFamily: 'Rubik-Regular',
  },
  buttonText: {
    [INCLUDE]: ['baseFont'],
  },
  leftExtra: {
    [INCLUDE]: ['baseFont'],
  },
  rightExtra: {
    [INCLUDE]: ['baseFont'],
  },
  infoText: {
    [INCLUDE]: ['baseFont'],
  },
  itemDescription: {
    [INCLUDE]: ['baseFont'],
  },
  h1: {
    [INCLUDE]: ['baseFont'],
    color: 'yellow',
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
  'dev.ext.LargeGridItem': {
    h1: {
      // color: 'green',
    },
    bottomButton: {
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
      headline: {
        [INCLUDE]: ['h1'],
        color: 'green',
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
      headline: {
        marginBottom: 30,
        // color: 'green',
      },
    },
    items: {
      rightExtra: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: '#888',
      },
      itemDescription: {
        // color: 'black',
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
});
