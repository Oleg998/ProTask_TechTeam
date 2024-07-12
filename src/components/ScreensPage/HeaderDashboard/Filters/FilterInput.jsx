import React, { forwardRef } from 'react';
import ErrorMessage from '../../../Header/UserForm/ErrorMessage';

import css from './filters.module.css';

const FilterInput = forwardRef(({ error, ...props }, ref) => {
  return (
    <label>
      <input
        ref={ref}
        className={css.filterInput}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </label>
  );
});

export default FilterInput;
