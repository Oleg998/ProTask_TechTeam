import AddColumn from './AddColumn/AddСolumn';
import ColumnList from './ColumnList';
import { useSelector } from 'react-redux';
import { selectDashboards, selectActiveBoardId} from '../../../redux/dashboards/dashboards-selectors';
import { getScreenType, getDeviceType } from 'helpers/screenType';
import css from './mainDashboard.module.css';

const MainDashboard = ({ boardId }) => {
  const backgraundClodinary = useSelector(selectDashboards)
  const activeBoardId = useSelector(selectActiveBoardId)


  const activeBoard = backgraundClodinary.find((board, idx) => {
    if (activeBoardId) {
      return board._id === activeBoardId
    }
    else {

      return idx === 0
    }
   })
  const backImgUrl = activeBoard && activeBoard.backgroundURL && activeBoard.backgroundURL[`${getScreenType()}${getDeviceType()}`];

  const dashboardStyles = backImgUrl ? {
    backgroundImage: `url(${backImgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  } : {};

  return (
    <section className={css.mainDashboardSection} style={dashboardStyles} >
      <ColumnList />
      <AddColumn boardId={boardId} />
    </section>
  );
};

export default MainDashboard;
