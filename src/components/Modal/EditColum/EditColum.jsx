import css from './editColum.module.css';

import FormBtn from '../FormBtn/FormBtn';

import { useState } from 'react';



const AddColum = ({ onClose, onSubmit ,columnTitle }) => {
  const INITIAL_STATE = {
    title:columnTitle,
  }
  const [columState, setColumState] = useState(INITIAL_STATE);

  const handelChange = ({ target }) => {
    const { name, value } = target;
    setColumState({ [name]: value });
  };

  const handelSubmit = e => {
    e.preventDefault();
    onClose(false);
    onSubmit(columState);
    setColumState(INITIAL_STATE);
  };
  const {title}=columState
  return (
    <form className={css.form} onSubmit={handelSubmit}>
      <input
        value={title}
        className={css.input}
        type="text"
        name="title"
        required
        onChange={handelChange}
        placeholder="Title "
      ></input>

      <FormBtn textBtn={'Add'} />
    </form>
  );
};

export default AddColum;
