import { useSelector } from 'react-redux';
import {
  selectDashboards,
  selectDashboardsLoading,
} from '../../../redux/dashboards/dashboards-selectors';
import css from './boardList.module.css';
import BoardListItem from './BoardListItem/BoardListItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBoardId } from '../../../redux/dashboards/dashboards-slice';


const BoardList = () => {
  const [activeBoardId, setActiveBoardId] = useState(null);
  const dashboards = useSelector(selectDashboards);
  const loading = useSelector(selectDashboardsLoading);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    if (dashboards.length > 0 && activeBoardId === null && !loading) {
      setActiveBoardId(dashboards[0]._id);
      dispatch(updateBoardId(dashboards[0]._id))
      navigate(`/home/${dashboards[0].title}`);
    }
  }, [dashboards, navigate, activeBoardId, loading, dispatch]);

  const handleBoardItemClick = boardId => {
    setActiveBoardId(boardId)
    dispatch(updateBoardId(boardId))
  };

  return (
    <ul className={css.boardList}>
      {dashboards.map(board => {
        return (
          <BoardListItem
            dashboards={dashboards}
            key={board._id}
            board={board}
            isActive={activeBoardId === board._id}
            onClick={() => handleBoardItemClick(board._id)}
            setActiveBoardId={setActiveBoardId}
          />
        );
      })}
    </ul>
  );
};
export default BoardList;
