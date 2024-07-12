import css from './newDashboard.module.css';
import IconsSprite from '../../../images/icons.svg';
import sprite from "./icon.svg"
import { selectToken } from '../../../redux/auth/auth-selectors';
import FormBtn from '../FormBtn/FormBtn';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { getBackgroundIcons } from '../../../api/dashboards-api';




import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/auth-selectors';

const NewDashboardModal = ({
  onClose,
  onSubmit,
  initialBoardState,
  btnText,
}) => {
  const INITIAL_STATE = {
    title: initialBoardState ? initialBoardState.title : '',
    icon: initialBoardState ? initialBoardState.icon : 'project-icon',
    background: initialBoardState
      ? initialBoardState.background
      : 'none-background',
  };

  const [newBoardState, setNewBoardState] = useState({ ...INITIAL_STATE });
  const [beckImg, setBeckImg] = useState();

  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };

  const dasbortTheme = themeClassMap[currentTheme] || '';
  const token = useSelector(selectToken);

 

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await getBackgroundIcons(token);
        const newArray = data.iconsBackgroundURL.map(obj => {
          const key = Object.keys(obj)[0];
          const value = obj[key];
          return { title: key, url: value };
        });
        setBeckImg(newArray);
      } catch (error) {
        Notiflix.Notify.failure(error.messager);
      }
    };
    fetchQuery();
  }, [token]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewBoardState({ ...newBoardState, [name]: value });
  };

  const validateInput = () => {
    return newBoardState.title.trim() !== '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateInput()) {
      Notiflix.Notify.failure('Title cannot be empty');
      return;
    }
    onClose(false);
    onSubmit(newBoardState);
    setNewBoardState({ ...INITIAL_STATE });
  };

  const iconsId = [
    'project-icon',
    'colors-icon',
    'cube-icon',
    'hexagon-icon',
    'lightning-icon',
    'circle-icon',
    'puzzle-piece-icon',
    'star-icon',
  ];

  const elementsIcon = iconsId.map(icon => (
    <label key={icon}>
      <input
        className={css.radio_input}
        name="icon"
        type="radio"
        value={icon}
        checked={newBoardState.icon === icon}
        onChange={handleChange}
      />
      <svg className={css.icon}>
        <use
          className={`${css.icon_use} ${dasbortTheme}`}
          href={`${IconsSprite}#${icon}`}
        />
      </svg>
    </label>
  ));

    const defaultElement =
    <div className={`${css.item} ${dasbortTheme}`}>
    <svg  className={css.item_svg}>   
      <use className={`${css.item_use} ${dasbortTheme}`}  href={`${sprite}#Icon (1)`} />
    </svg>
  </div>


    const elementsBackground = beckImg && beckImg.map(({ title, url }) => (
      <label key={title}>
        <input
          className={css.radio_input}
          name="background"
          type="radio"
          value={title}
          checked={newBoardState.background === title}
          onChange={handleChange}
        />
        <img className={css.backgraund_img} src={url} alt="" />
      </label>
    ));

  const { title } = newBoardState;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        value={title}
        className={`${css.input} ${dasbortTheme}`}
        type="text"
        name="title"
        required
        onChange={handleChange}
        placeholder="Title "
      ></input>
      <p className={`${css.radio_titel} ${dasbortTheme}`}>Icon:</p>
      <div className={css.radio_wrapper_icon}>{elementsIcon}</div>
      <p className={`${css.radio_titel} ${dasbortTheme}`}>Background:</p>
      <div className={css.radio_wrapper_bgimg}>
        <label key={"none-background"} >
          <input
            className={css.radio_input}
            name="background"
            type="radio"
            value={"none-background"}
            checked={newBoardState.background === "none-background"}
            onChange={handleChange}
          />
          {defaultElement}
        </label>
        {elementsBackground}
        </div>
      <FormBtn textBtn={btnText} />
    </form>
  );
};

export default NewDashboardModal;
