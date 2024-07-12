import { useState } from "react"
import sprite from "../../../images/icons.svg"
import css from "./filterModal.module.css"


import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/theme/theme-selectors";

const FilterModal = ({ onSubmit }) => {

    const currentTheme = useSelector(selectTheme)

    const themeClassMap = {
    'dark': css.theme_dark,
    'light': css.theme_light,
    'violet': css.theme_violet,
  };

  const filterClassName = themeClassMap[currentTheme] || '';
 
    const [filterModalState, setFilterModal] = useState({color:'Low'});
  
    const handleChange = ({ target }) => {
      const { name, value } = target;
      setFilterModal({[name]: value });
       };
    
  
  
    const {color} = filterModalState;
    return (
      <>
      <div className={css.titel_line}>
  
        <div className={css.titel_conteiner} >
        <p className={css.titel_texte}>Label colors</p>
        <button className={css.show_all_btn} type="button" name="color" value="All" onClick={handleChange} >Show all </button>
        </div>
        
      </div>
      <form className={css.form} >
        <div className={css.radio_container_item}>
          <div>
            <input
              checked={color === 'Without'}
              className={css.radio_input}
              name="color"
              type="radio"
              value="Without"
              id="Without"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Without">
              <svg className={css.icon}>
                <use
                  href={`${sprite}${
                    color === 'Without' ? '#radio-active-icon' : '#radio-icon'
                  }`}
                />
              </svg>
              <span className={`${css.span}${filterClassName}`}>Without priority</span>
            </label>
          </div>
  
          <div>
            <input
              checked={color === 'Low'}
              className={css.radio_input}
              name="color"
              type="radio"
              value="Low"
              id="Low"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Low">
              <svg className={css.icon}>
                <use
                  href={`${sprite}${
                    color === 'Low' ? '#radio-active-icon' : '#radio-icon'
                  }`}
                />
              </svg>
              <span className={`${css.span}${filterClassName}`}>Low</span>
            </label>
          </div>
  
          <div>
            <input
              checked={color === 'Medium'}
              className={css.radio_input}
              name="color"
              type="radio"
              value="Medium"
              id="Medium"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Medium">
              <svg className={css.icon}>
                <use
                  href={`${sprite}${
                    color === 'Medium' ? '#radio-active-icon' : '#radio-icon'
                  }`}
                />
              </svg>
              <span className={`${css.span}${filterClassName}`}>Medium</span>
            </label>
          </div>
  
          <div>
            <input
              checked={color === 'High'}
              className={css.radio_input}
              name="color"
              type="radio"
              value="High"
              id="High"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="High">
              <svg className={css.icon}>
                <use
                  href={`${sprite}${
                    color === 'High' ? '#radio-active-icon' : '#radio-icon'
                  }`}
                />
              </svg>
              <span className={`${css.span}${filterClassName}`}>High</span>
            </label>
          </div>
        </div>
      </form>
      </>
    );
  };
  
  export default FilterModal;
  
