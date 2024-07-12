import css from './logout.module.css';
import sprite from '../../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/auth-operation';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/auth-selectors';
import {resetDashboards} from "../../../redux/dashboards/dashboards-slice"

const Logout = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetDashboards())
  }

  const logoutTextColor = currentTheme === 'light' ? '#161616' : '#ffffff';

  return (
    <div className={css.block}>
      <button onClick={onLogout} className={css.logoutBtn}>
        <svg className={css.logoutIcon} width="32" height="32">
          <use href={`${sprite}#logout-icon`}></use>
        </svg>
        <p className={css.logoutText} style={{ color: logoutTextColor }}>
          Log out
        </p>
      </button>
    </div>
  );
};
export default Logout;
