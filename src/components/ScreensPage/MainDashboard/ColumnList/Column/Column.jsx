import { useSelector } from 'react-redux';
import { selectColumnsPriority } from '../../../../../redux/dashboards/columns/columns-selectors';

import AddCard from './AddCard';
import CardList from './CardList';
import ColumnHeader from './ColumnHeader';

import { selectTasks } from '../../../../../redux/dashboards/tasks/tasks-selectors';

import css from './column.module.css';

const Column = ({ column }) => {
  const allCards = useSelector(selectTasks);
  const priority = useSelector(selectColumnsPriority);

  const currentColumnCards = allCards.filter(
    ({ columnId }) => columnId === column._id
  );

  const filteredColumnCards = currentColumnCards.filter(
    card => priority === '' || card.priority.toLowerCase() === priority
  );

  const isCardPresent = currentColumnCards[0] !== undefined;
  const itemClass = isCardPresent
    ? css.item + ' ' + css.itemCardPresent
    : css.item;

  return (
    <li className={itemClass}>
      <div className={css.wrap}>
        <ColumnHeader column={column} />

        <CardList cards={filteredColumnCards} />
      </div>
      <AddCard boardId={column.boardId} columnId={column._id} />
    </li>
  );
};

export default Column;
