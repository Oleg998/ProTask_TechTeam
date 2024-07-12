import css from './current-theme.module.css';

import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/auth-selectors';

const CurrentTheme = ({ children }) => {
  const currentTheme = useSelector(selectTheme);
  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };
  const sidebarTheme = themeClassMap[currentTheme] || '';

  return <div className={`${sidebarTheme}`}>{children}</div>;
};

export default CurrentTheme;
