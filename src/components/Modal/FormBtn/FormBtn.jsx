import css from './formBtn.module.css';
import sprite from "../../../images/icons.svg"

import { useSelector } from 'react-redux';
import { selectTheme } from "../../../redux/auth/auth-selectors";

const FormBtn = ({ textBtn }) => {
  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };

  const formBtnTheme = themeClassMap[currentTheme] || '';
  return (
    <button className={`${css.btn} ${formBtnTheme}`} type="submit">
      <div className={`${css.item} ${formBtnTheme}`}>
        <svg  className={css.item_svg}>
          <use className={`${css.item_use} ${formBtnTheme}`}  href={`${sprite}#plus-icon`}></use>
        </svg>
      </div>
      {textBtn}
    </button>
  );
};

export default FormBtn;
