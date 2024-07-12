import React, { createContext, useState } from 'react';

export const ThemeContext = createContext('theme-light');

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-light');

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
