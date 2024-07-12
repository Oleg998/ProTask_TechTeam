import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal/Modal';
import AddColumnModal from 'components/Modal/AddColumnModal/AddColumnModal';

import { addColumn } from '../../../../redux/dashboards/columns/columns-operations';

import sprite from '../../../../images/icons.svg';

import css from './addColumn.module.css';

import { useSelector } from 'react-redux';
import { selectTheme } from '../../../../redux/auth/auth-selectors';
import createStyle from 'shared/functions/style';

const AddColumn = ({ boardId }) => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = body => {
    dispatch(addColumn({ boardId, body }));
  };

  return (
    <>
      <button
        className={`${css.addColumnBtn} ${css[createStyle(theme, 'btn')]}`}
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
        Add another column
      </button>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} title={'Add column'}>
        <AddColumnModal onClose={setIsModalOpen} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default AddColumn;
