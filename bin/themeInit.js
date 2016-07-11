import { INCLUDE } from '@shoutem/theme';

export default (vars) => {
  const variables = {
    brandColor: 'black',
    ...vars,
  };

  return {
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
    sectionHeaderGrey: {
      [INCLUDE]: ['baseFont'],
      color: '#888888',
      paddingHorizontal: 15,
      paddingTop: 25,
      paddingBottom: 10,
      fontSize: 12,
      fontWeight: '600',
    },
    navigationBarWhite: {
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
      backgroundColor: '#f2f2f2',
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
    'shoutem.ui.ListView': {
      header: {
        container: {},
        search: {
          container: {
            backgroundColor: '#2c2c2c',
          },
        },
      },
      list: {},
      listContent: {},
    },
    'shoutem.ui.GridView': {
      header: {
        container: {},
        search: {
          container: {
            backgroundColor: '#2c2c2c',
          },
        },
      },
      list: {
        paginationView: {
          height: 0,
          marginTop: 10,
        },
        actionsLabel: {
          height: 0,
        },
      },
      gridRow: {
        container: {
          paddingHorizontal: 2.5,
        },
        gridItemCell: {
          marginHorizontal: 2.5,
          marginVertical: 2.5,
        },
      },
    },
    'shoutem.ui.NavigationBar': {
      '.clear': {
        container: {
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderBottomWidth: 0,
        },

        defaultBackButton: {
          'shoutem.ui.Icon': {
            color: 'white',
          },
        },
      },

      container: {
        backgroundColor: '#fff',
        borderBottomColor: 'rgb(242, 242, 242)',
        borderBottomWidth: 1,
      },
      defaultBackButton: {
        'shoutem.ui.Icon': {
          color: variables.brandColor,
        },
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
        [INCLUDE]: ['baseFont'],
        fontSize: 16,
        lineHeight: 24,
        color: variables.brandColor,
      },
    },
    'shoutem.news.ListScreen': {
      navigation: {
        [INCLUDE]: ['navigationBarWhite'],
      },
      sectionHeader: {
        [INCLUDE]: ['sectionHeaderGrey'],
      },
      screen: {},
    },
    'shoutem.news.GridScreen': {
      navigation: {
        [INCLUDE]: ['navigationBarWhite'],
      },
      sectionHeader: {
        [INCLUDE]: ['sectionHeaderGrey'],
      },
    },
    'shoutem.news.DetailsScreen': {
      headline: {
        padding: 40,
        alignItems: 'center',
        'shoutem.ui.Title': {
          textAlign: 'center',
          color: '#fff',
          backgroundColor: 'transparent',
          marginBottom: 15,
        },
        'shoutem.ui.View': {
          'shoutem.ui.Caption': {
            color: '#fff',
            fontSize: 13,
            marginHorizontal: 8,
          },
        },
      },
      upNext: {
        container: {
          height: 130,
        },
        content: {
          'shoutem.ui.Subtitle': {
            color: '#fff',
          },
          'shoutem.ui.Caption': {
            color: '#fff',
          },
        },
      },
      header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: null,
        flex: 0,
      },
      scrollIndicator: {
        color: '#fff',
        marginBottom: 30,
      },
      screen: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingTop: 0,
      },
      detailsText: {},
      detailsTitle: {
        [INCLUDE]: ['h1'],
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
      },
      detailsTitleContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
      },
      detailsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
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
      navBarTitle: {
        [INCLUDE]: ['navigationBarTextColor'],
      },
    },
  };
};
