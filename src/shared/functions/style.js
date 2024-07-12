const createStyle = (theme, el) => {
  const themeClassArr = {
    dark: 'theme_dark',
    light: 'theme_light',
    violet: 'theme_violet',
  };
  const currentTheme = themeClassArr[theme];
  if (!currentTheme) return `theme_light_${el}`;
  return currentTheme + '_' + el;
};

export default createStyle;
