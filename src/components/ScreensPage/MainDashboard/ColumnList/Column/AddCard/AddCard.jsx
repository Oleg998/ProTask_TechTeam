import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Modal from 'components/Modal/Modal';
import AddCardModal from 'components/Modal/AddCardModal/AddCardModal';

import { addTask } from '../../../../../../redux/dashboards/tasks/tasks-operations';

import sprite from '../../../../../../images/icons.svg';

import css from './addCard.module.css';

import { useSelector } from 'react-redux';
import { selectTheme } from '../../../../../../redux/auth/auth-selectors';
import createStyle from 'shared/functions/style';

const AddCard = ({ boardId, columnId }) => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = body => {
    dispatch(addTask({ boardId, columnId, body }));
  };

  return (
    <>
      <button
        className={`${css.addCardBtn} ${css[createStyle(theme, 'btn')]}`}
        onClick={handleClick}
      >
        <span className={`${css.plus} ${css[createStyle(theme, 'plus')]}`}>
          <svg
            className={`${css.plusIcon} ${
              css[createStyle(theme, 'plus_icon')]
            }`}
          >
            <use href={`${sprite}#plus-icon`} />
          </svg>
        </span>
        Add another card
      </button>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} title={'Add Card'}>
        <AddCardModal
          onClose={setIsModalOpen}
          onSubmit={handleSubmit}
          btnText={'Add'}
        />
      </Modal>
    </>
  );
};

export default AddCard;
