import React from 'react';
import styles from './header.module.css';

const ThemeSelector = ({ setTheme }) => {
  const handleThemeChange = e => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  return (
    <div className={styles.select}>
      <label htmlFor="themeSelect">Theme</label>
      <select
        id="themeSelect"
        onChange={handleThemeChange}
        value=""
        className={styles.customSelect}
      >
        <option value="" disabled hidden></option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="violet">Violet</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
