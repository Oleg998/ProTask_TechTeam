import React from 'react';
import { useCurrentTheme } from '../../helpers/useCurrentTheme';
import styles from './header.module.css';

const ThemeSelectorIcon = () => {
  const { themeClassName } = useCurrentTheme();

  return (
    <svg
      className={`${styles.iconSelector} ${themeClassName}`}
      width="20"
      height="20"
    >
      <use href="#Vector" />
      <symbol
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 7"
        id="Vector"
      >
        <path
          d="M1 1.5L5 5.5L9 1.5"
          stroke="#161616"
          strokeOpacity="0.8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
    </svg>
  );
};

export default ThemeSelectorIcon;
