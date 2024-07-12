import React, { forwardRef } from 'react';

import css from './filters.module.css';

const FilterRadioBtn = forwardRef(({ label, color, ...props }, ref) => {
  return (
    <label className={css.filterPriorityLabel}>
      <input ref={ref} className={css.radioBtn} type="radio" {...props} />

      <span
        style={{ background: color, borderColor: color }}
        className={css.radioBox}
      />

      {label}
    </label>
  );
});

export default FilterRadioBtn;
