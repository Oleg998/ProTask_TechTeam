import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { selectIsLogin, selectToken } from "../../redux/auth/auth-selectors";


const PublicRoute = () => {
    const isLogin = useSelector(selectIsLogin);
    const token = useSelector(selectToken)

    if(!isLogin && token) {
        return "Loading..."
    }

    if(isLogin) {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default PublicRoute;