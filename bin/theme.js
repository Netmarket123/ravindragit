export default (vars) => {
  const variables = {
    brandColor: 'black',
    navBarBackgroundColor: 'white',
    ...vars,
  };

  return {
    baseText: {
      fontFamily: 'Rubik-Regular',
    },
    'shoutem.ui.View': {
      '.hero-image-container': {
        padding: 5,
        backgroundColor: variables.navBarBackgroundColor,
      },
    },
  };
};
