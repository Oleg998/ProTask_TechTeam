import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from './CloseButton/CloseButton';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/auth-selectors';

import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');
const Modal = ({ isOpen, onClose, children, title }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const currentTheme = useSelector(selectTheme);

  const themeClassMap = {
    dark: css.theme_dark,
    light: css.theme_light,
    violet: css.theme_violet,
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  const modalTheme = themeClassMap[currentTheme] || '';

  return createPortal(
    <>
      {isOpen && (
        <div
          onClick={closeModal}
          className={`${css.modal_wrapper} ${modalTheme}`}
        >
          <div className={css.modal_content}>
            <h2 className={css.modalTitle}>{title}</h2>

            <CloseButton onClose={onClose} />
            {children}
          </div>
        </div>
      )}
    </>,
    modalRoot
  );
};

export default Modal;
