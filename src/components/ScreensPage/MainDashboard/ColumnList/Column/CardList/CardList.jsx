import Card from './Card/Card';

import css from './cardList.module.css';

const CardList = ({ cards }) => {
  return (
    <ul className={css.list}>
      {cards.map(card => {
        return <Card key={card._id} card={card} />;
      })}
    </ul>
  );
};

export default CardList;
