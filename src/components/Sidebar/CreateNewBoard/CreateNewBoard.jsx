import css from './createNewBoard.module.css';
import Modal from '../../Modal/Modal';
import NewDashboardModal from 'components/Modal/NewDashboardModal/NewDashboardModal';
import { useState } from 'react';
import sprite from '../../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { addDashboard } from '../../../redux/dashboards/dashboards-operations';

import CurrentTheme from 'shared/components/CurrentTheme/CurrentTheme';

const CreateNewBoard = () => {
  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState(false);

  const onSubmit = data => {
    dispatch(addDashboard(data));
  };

  return (
    <div>
      <button
        onClick={() => setModalActive(true)}
        className={css.createNewBoardBtn}
      >
        <CurrentTheme>
          <p className={css.createNewBoardTitle}>Create a new board</p>
        </CurrentTheme>
        <CurrentTheme>
          <div className={css.createNewBoardIcon}>
            <svg className={css.createNewBoardItem} width="20" height="20">
              <use href={`${sprite}#plus-icon`}></use>
            </svg>
          </div>
        </CurrentTheme>
      </button>
      <Modal isOpen={modalActive} onClose={setModalActive} title={'New board'}>
        <NewDashboardModal
          onClose={setModalActive}
          onSubmit={onSubmit}
          btnText={'Create'}
        />
      </Modal>
    </div>
  );
};

export default CreateNewBoard;
