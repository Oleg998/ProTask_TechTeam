import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/auth-selectors';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const userData = useSelector(selectUser);

  useEffect(() => {
    if (userData) {
      setUser(userData.message ?? userData);
    }
  }, [userData]);

  return {
    user,
  };
};
