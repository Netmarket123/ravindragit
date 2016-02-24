export const variables = {
  colorFont: '#ffffff',
  colorFontBackground: 'transparent',
  colorDark: '#454545',
};
export function getTheme() {
  // immutable
  return {
    h1: {
      fontSize: 20,
      color: variables.colorFont,
      backgroundColor: variables.colorFontBackground,
    },
    paragraph: {
      color: variables.colorFont,
      backgroundColor: variables.colorFontBackground,
    },
    textCenter: {
      textAlign: 'center',
    },
  };
}
