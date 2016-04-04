import { INCLUDE } from 'shoutem/theme/StyleIncluder';

const variables = {
  ganetColor: '#961a2d',
};

export default {
  baseFont: {
    color: '#454545',
  },
  h1: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 20,
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
    screen: {
      marginTop: 70,
    },
    featuredItem: {
      container: {
        padding: 30,
        backgroundColor: variables.ganetColor,
      },
      headline: {
        marginBottom: 30,
      },
    },
    items: {
      rightExtra: {
        fontSize: 12,
        color: '#888',
      },
      itemDescription: {
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
  'dev.ext.GannettDetailsScreen': {
    title: {
      fontSize: 30,
      lineHeight: 30,
      color: '#fff',
    },
  },
  'shoutem.ui.NavigationBar': {
    container: {
      backgroundColor: variables.ganetColor,
    },
    backButton: {
      buttonIcon: {
        color: 'white',
        fontSize: 24,
      },
    },
  },
};