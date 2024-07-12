
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { register, login } from "../../redux/auth/auth-operation";
import { selectAuthError, selectAuthLoading } from "../../redux/auth/auth-selectors";
import RegisterForm from "components/RegisterForm/RegisterForm";
import LoginForm from "components/LoginForm/LoginForm";
import Loader from "components/Loader/Loader";

import styles from "./authPage.module.css";

const AuthPage = () => {
    const { id } = useParams();
    const authLoading = useSelector(selectAuthLoading);
    const authError = useSelector(selectAuthError);
    const dispatch = useDispatch();

    const handleRegister = async (data) => {
        const registrationResult = await dispatch(register(data));
        if (registrationResult.type === 'auth/register/fulfilled') {
            dispatch(login({ email: data.email, password: data.password }));
        }
    }
    const handleLogin = data => {
        dispatch(login(data));
    }

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
            {id === "register" ? (
                <>
                    {authLoading && <Loader />}
                    <RegisterForm onSubmit={handleRegister}/>
                    {authError && <div className={styles.error}>{authError}</div>}
                </>
            ) : (
                <>
                    {authLoading && <Loader />}
                    <LoginForm onSubmit={handleLogin}/>
                    {authError && <div className={styles.error}>{authError}</div>}
                </>
            )}
        </div>
      </div>
    );
};

export default AuthPage;

