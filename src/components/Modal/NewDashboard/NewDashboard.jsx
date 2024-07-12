import css from "./newDashboard.module.css"
import IconsSprite from "../../../images/icons.svg"
import BackImg from "../cat.jpg"
import FormBtn from "../FormBtn/FormBtn"

import { useState } from "react"


const INITIAL_STATE = {
    title: '',
    icon: 'project-icon',
    background: 'none-background',
  };

  
  const NewDashboard = ({ onClose, onSubmit }) => {
    const [newBoardState, setNewBoardState] = useState({ ...INITIAL_STATE });
  
    const handelChange = ({ target }) => {
      const { name, value } = target;
      setNewBoardState({ ...newBoardState, [name]: value });
    };
    const handelSubmit = e => {
      e.preventDefault();
      onClose(false);
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
          onChange={handelChange}
        />
        <svg className={css.icon}>
          <use className={css.icon_use} href={`${IconsSprite}#${icon}`} />
        </svg>
      </label>
    ));
  
    const backgroundList = [
      'none-background',
      'magnolia',
      'starry-sky',
      'sakura',
      'half-moon',
      'palm-leaves',
      'clouds',
      'rocky-beach',
      'violet-ball',
      'full-moon',
      'yacht',
      'baloon',
      'mountains',
      'sea',
      'baloon-sky',
      'night-trailer',
    ];
  
    const elementsBackground = backgroundList.map(backgroundOption => (
      <label key={backgroundOption}>
        <input
          className={css.radio_input}
          name="background"
          type="radio"
          value={backgroundOption}
          checked={newBoardState.background === backgroundOption}
          onChange={handelChange}
        />
        <img className={css.backgraund_img} src={BackImg} alt="" />
      </label>
    ));
  
    const { title } = newBoardState;
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
        <p className={css.radio_titel}>Icon:</p>   
          <div className={css.radio_wrapper_icon}>        
          {elementsIcon}
        </div>
        <p className={css.radio_titel}>Background:</p>
        <div className={css.radio_wrapper_bgimg}>        
          {elementsBackground}
        </div>
        <FormBtn textBtn={"Create"} />
      </form>
    );
  };
  
  export default NewDashboard;
  