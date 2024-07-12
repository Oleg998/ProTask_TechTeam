import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

import styles from './UserForm.module.css';

const Input = forwardRef(({ error, ...props }, ref) => {
  return (
    <label className={styles.label}>
      <input
        ref={ref}
        className={styles.input}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </label>
  );
});

export default Input;
