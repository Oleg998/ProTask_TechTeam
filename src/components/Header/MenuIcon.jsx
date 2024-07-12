import React from 'react';
import { useCurrentTheme } from '../../helpers/useCurrentTheme';
import styles from './header.module.css';

const MenuIcon = () => {
  const { themeClassName } = useCurrentTheme();

  return (
    <svg
      className={`${styles.icon} ${themeClassName}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12H21"
        stroke="#161616"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke="#161616"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18H21"
        stroke="#161616"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
