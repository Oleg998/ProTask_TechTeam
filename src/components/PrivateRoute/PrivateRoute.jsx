import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectToken } from '../../redux/auth/auth-selectors';
import Loader from 'components/Loader/Loader';


const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);

  if (!isLogin && token) {
    return <Loader />;
  }
  if (!isLogin && !token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
