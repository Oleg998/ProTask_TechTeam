import { NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLogin } from "../../redux/auth/auth-selectors";

import styles from "./welcomePage.module.css"

import welcomeImg from "../../images/Welcome.png"
import welcomeImgx2 from "../../images/Welcome-2x.png"
import icon from "../../images/icons.svg"


const WelcomePage = () => {
    const isLogin = useSelector(selectIsLogin);

    if(isLogin) {
        return <Navigate to="/home" />
    }

    return(
        <div className={styles.wrap}>
            <img className={styles.image} src={welcomeImg}  srcSet={welcomeImgx2} alt="Man with a laptop emoji"/>
            <div className={styles.item}>
                <div className={styles.logoIconWrap}>
                    <svg className={styles.logoIcon}>
                        <use href={`${icon}#taskPro-icon`}  />
                    </svg>
                </div>
                <p className={styles.itemText}>Task Pro</p>
            </div>
                <p className={styles.text}>
                    Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!
                </p>
            <div className={styles.buttonWrapper}>
                <NavLink to="/auth/register" className={styles.link}>
                    <button className={styles.button} type="button">Registration</button>
                </NavLink>
                <NavLink to="/auth/login" className={styles.link}>
                    Log in
                </NavLink>
            </div>
        </div>
    )
};

export default WelcomePage;
