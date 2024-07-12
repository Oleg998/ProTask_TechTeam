import React from 'react';
import defaultAvatar from './avatar.png';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ user }) => {
  let avatarSrc = defaultAvatar;

  if (typeof user.avatarURL === 'string' && user.avatarURL.startsWith('data:image')) {
    avatarSrc = user.avatarURL;
  } else if (user.avatarURL instanceof File) {
    avatarSrc = URL.createObjectURL(user.avatarURL);
  } else if (user.avatarURL) {
    avatarSrc = user.avatarURL;
  }
  return (
    <img
      className={styles.userAvatar}
       src={avatarSrc}
      alt={user.name}
    />
  );
};

export default UserAvatar;
