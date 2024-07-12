import css from './closeButton.module.css';
import sprite from '../../../images/icons.svg';

import { useSelector } from 'react-redux';
import { selectTheme } from "../../../redux/auth/auth-selectors"

const CloseButton = ({ onClose }) => {


  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };

  const closeBtnTheme = themeClassMap[currentTheme] || '';

    const handleClick = () => {
      onClose();
    }

  return (
    <button className={css.btn_close} onClick={handleClick} >
      <svg className={css.item_svg}>
        <use className={`${css.item_use} ${closeBtnTheme}`} href={`${sprite}#x-close-icon`} />
      </svg>
    </button>
  );
};

export default CloseButton;
