import css from './logoComponent.module.css';

import sprite from '../../../images/icons.svg';
import CurrentTheme from 'shared/components/CurrentTheme/CurrentTheme';

const LogoComponent = () => {
  return (
    <div className={css.logoComponent}>
      {/* <img src={logo} alt="logo" className={css.logo} /> */}
      <CurrentTheme>
        <div className={css.logoBg}>
          <svg className={css.logo} width="12" height="16">
            <use href={`${sprite}#icon-logo`}></use>
          </svg>
        </div>
      </CurrentTheme>
      <h2 className={css.logoTitle}>Task Pro</h2>
    </div>
  );
};

export default LogoComponent;
