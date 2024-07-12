import React from 'react';

import styles from './UserForm.module.css';

const ErrorMessage = ({ children }) => {
  return (
    <span className={styles.errorMessage} role="alert">
      {children}
    </span>
  );
};

export default ErrorMessage;
