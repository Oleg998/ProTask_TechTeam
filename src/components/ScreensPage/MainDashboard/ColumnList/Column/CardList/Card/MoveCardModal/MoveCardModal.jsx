import css from './moveCardModal.module.css';
import sprite from '../../../../../../../../images/icons.svg'
import { useSelector } from 'react-redux';
import { selectColumns } from '../../../../../../../../redux/dashboards/columns/columns-selectors';
import { selectTheme } from '../../../../../../../../redux/auth/auth-selectors';
import { useEffect, useRef } from 'react';
import createStyle from 'shared/functions/style';

const MoveCardModal = ({ isOpen, onClose, onClick, currentColumnId }) => {
  const columns = useSelector(selectColumns);
  const selectRef = useRef(null);
  const theme = useSelector(selectTheme)
  const columnsToMove = columns.filter(column => {
    return column._id !== currentColumnId;
  });

  useEffect(() => {
    const handleClickOutside = event => {
      if (isOpen && !selectRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div className={`${css.moveModal} ${css[createStyle(theme, 'moveModal')]}`} ref={selectRef}>
        {columnsToMove.length === 0 ? (
          <p>There is no columns to move your task</p>
        ) : (
          <ul className={css.move_button_list}>
            {columnsToMove.map(item => (
              <li key={item._id}>
                <button onClick={() => onClick(item._id)} className={`${css.moveButton} ${css[createStyle(theme, 'moveButton')]}`}>
                  {item.title}
                  <svg className={`${css.move_icon} ${css[createStyle(theme, 'move_icon')]}`} width="16" height="16">
                    <use href={`${sprite}#arrow-circle-icon`}/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export default MoveCardModal;
