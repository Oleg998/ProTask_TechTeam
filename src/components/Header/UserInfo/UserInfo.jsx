import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../Modal/Modal';
import UserAvatar from '../UserAvatar';
import UserForm from '../UserForm';
import { selectTheme, selectToken } from '../../../redux/auth/auth-selectors';
import styles from './userInfo.module.css';
import { updateUserProfile } from '../../../api/user-api';
import Loader from 'components/Loader/Loader';

const UserInfo = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentTheme = useSelector(selectTheme);
  const token = useSelector(selectToken);

  const themeClassMap = {
    dark: styles.theme_dark,
    light: styles.theme_light,
    violet: styles.theme_violet,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProfile = async (updatedUserData) => {
    setIsLoading(true);
    try {
      const formData = {
        name: updatedUserData.name || "",
        email: updatedUserData.email || "",
        password: updatedUserData.password || "",
        avatar: updatedUserData.avatar || "",
      };
      const response = await updateUserProfile(token, formData);
      setUser(response.user);
      setIsLoading(false);

      closeModal();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const userInfoPageTheme = themeClassMap[currentTheme] || '';

  return (
    <div className={`${styles.userContainer} ${userInfoPageTheme}`}>
      <button onClick={openModal} className={styles.userInfo}>
        <span>{user?.name ?? 'N/A'}</span>
        <span
          style={{
            width: '32px',
            height: '32px',
          }}
        >
          <UserAvatar user={user} />
        </span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <Loader />
        ) : (
          <UserForm user={user} onSubmit={handleEditProfile} />
        )}
      </Modal>
    </div>
  );
};

export default UserInfo;
