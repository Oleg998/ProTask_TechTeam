import css from './CustomRadio.module.css';

const CustomRadio = ({ name, value, checked, onChange, svgIcon }) => {
  return (
    <label className={css.customRadio}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={css.radioInput}
      />
      <div className={css.radioIcon}>{svgIcon}</div>
    </label>
  );
};

export default CustomRadio;
