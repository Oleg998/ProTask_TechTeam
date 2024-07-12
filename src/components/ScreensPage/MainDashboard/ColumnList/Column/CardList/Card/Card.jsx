import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Confirm } from 'notiflix';
import BtnList from 'shared/components/BtnList';
import Modal from 'components/Modal/Modal';
import AddCardModal from 'components/Modal/AddCardModal/AddCardModal';
import {
  deleteTask,
  editTask,
} from '../../../../../../../redux/dashboards/tasks/tasks-operations';
import { switchColumn } from '../../../../../../../redux/dashboards/columns/columns-operations';

import css from './card.module.css';

import { selectTheme } from '../../../../../../../redux/auth/auth-selectors';
import createStyle from 'shared/functions/style';
import MoveCardModal from './MoveCardModal';

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
function formatDateString(dateString) {
  const parts = dateString.split('/');
  let month = parts[0];
  let day = parts[1];
  const year = parts[2];
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (day.length === 1) {
    day = `0${day}`;
  }
  return `${day}/${month}/${year}`;
}

const Card = ({
  card: {
    _id: taskId,
    columnId,
    boardId,
    title,
    description,
    priority,
    deadline,
  },
}) => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);

  const spriteArr = ['arrow-circle-icon', 'pencil-icon', 'trash-icon'];
  const idArr = [
    `moveCard${taskId}`,
    `editCard${taskId}`,
    `deleteCard${taskId}`,
    `deadline${taskId}`,
  ];
  const handleSubmit = body => {
    dispatch(editTask({ columnId, taskId, body }));
  };

  const handleMoveClick = newColumnId => {
    const body = { taskId, newColumnId };
    dispatch(switchColumn({ boardId, body }));
    setIsMoveModalOpen(false);
  };

  const handleClick = e => {
    switch (e.currentTarget.id) {
      case idArr[0]:
        return setIsMoveModalOpen(true);
      case idArr[1]:
        return setIsModalOpen(true);
      case idArr[2]:
        return Confirm.show(
          'Deleting',
          `Are you sure you want to delete task ${title}?`,
          'Yes',
          'No',
          () => {
            dispatch(deleteTask({ columnId, taskId }));
          }
        );
      default:
        return;
    }
  };
  const formattedDeadline = formatDateString(deadline);
  const isDeadline = formattedDeadline === getFormattedDate();
  function getPriorityClass(priority, prefix = '') {
    switch (priority) {
      case 'High':
        return css[`${prefix}High`];
      case 'Medium':
        return css[`${prefix}Medium`];
      case 'Low':
        return css[`${prefix}Low`];
      default:
        return css[`${prefix}Without`];
    }
  }
  return (
    <>
      <li
        className={`${css.card} ${getPriorityClass(priority, 'cardPriority')} ${
          css[createStyle(theme, 'card')]
        }`}
      >
        <h4 className={`${css.cardTitle} ${css[createStyle(theme, 'text')]}`}>
          {title}
        </h4>
        <p
          className={`${css.cardText} ${css[createStyle(theme, 'text')]} ${
            css[createStyle(theme, 'descr')]
          }`}
        >
          {description}
        </p>
        <div className={css.wrapCardInfo}>
          <div className={css.wrapPriorityDeadline}>
            <div className={css.wrapLeft}>
              <h6
                className={`${css.infoText} ${css[createStyle(theme, 'text')]}`}
              >
                Priority
              </h6>
              <div className={css.prioritySpanText}>
                <span
                  className={`${css.colorSpan} ${getPriorityClass(
                    priority,
                    'priority'
                  )}`}
                ></span>
                <p className={`${css.info} ${css[createStyle(theme, 'text')]}`}>
                  {priority}
                </p>
              </div>
            </div>
            <div className={css.wrapLeft}>
              <h6
                className={`${css.infoText} ${css[createStyle(theme, 'text')]}`}
              >
                Deadline
              </h6>
              <p className={`${css.info} ${css[createStyle(theme, 'text')]}`}>
                {formattedDeadline}
              </p>
            </div>
          </div>
          <div className={css.modalMoveWrapper}>
            <MoveCardModal
              isOpen={isMoveModalOpen}
              onClose={setIsMoveModalOpen}
              onClick={handleMoveClick}
              currentColumnId={columnId}
            />
          </div>
          <BtnList
            theme={theme}
            spriteArr={spriteArr}
            idArr={idArr}
            handleClick={handleClick}
            isDeadline={isDeadline}
          />
        </div>
      </li>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} title={'Edit Card'}>
        <AddCardModal
          onClose={setIsModalOpen}
          onSubmit={handleSubmit}
          initialTaskState={{ title, description, priority, deadline }}
          btnText={'Edit'}
        />
      </Modal>
    </>
  );
};

export default Card;
