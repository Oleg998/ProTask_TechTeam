import css from './addColumnModal.module.css';

import FormBtn from '../FormBtn/FormBtn';
import Notiflix from 'notiflix';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectTheme } from "../../../redux/auth/auth-selectors"


const AddColumnModal = ({ onClose, onSubmit , initialColumnState }) => {

  
 

  const INITIAL_STATE = {
    title:initialColumnState?initialColumnState.title: '',
  };

  const [columnState, setColumnState] = useState(INITIAL_STATE);

  const validateInput = () => {
    return columnState.title.trim() !== '';
  };

  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };

  const columnTheme = themeClassMap[currentTheme] || '';

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setColumnState({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateInput()) {
      Notiflix.Notify.failure('Title cannot be empty')
      return
    }
    onClose(false);
    onSubmit(columnState);
    setColumnState(INITIAL_STATE);
  };

  const { title } = columnState;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        value={title}
        className={`${css.input} ${columnTheme}`}
        type="text"
        name="title"
        required
        onChange={handleChange}
        placeholder="Title "
      ></input>

      <FormBtn textBtn={'Add'} />
    </form>
  );
};

export default AddColumnModal;
