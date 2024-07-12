import { useSelector } from 'react-redux';

import Filters from './Filters';

import { selectTheme } from '../../../redux/auth/auth-selectors';
import createStyle from 'shared/functions/style';

import css from './headerDashboard.module.css';

const HeaderDashboard = ({ boardName }) => {
  const theme = useSelector(selectTheme);

  return (
    <section className={css.headerDashboardSection}>
      <h3
        className={`${css.titleDashboard} ${css[createStyle(theme, 'title')]}`}
      >
        {boardName}
      </h3>
      <Filters />
    </section>
  );
};

export default HeaderDashboard;
