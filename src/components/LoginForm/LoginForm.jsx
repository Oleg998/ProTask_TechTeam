import { useState, useId, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchemas";

import icon from "../../images/icons.svg"

import styles from "./loginForm.module.css";

const LoginForm = ({ onSubmit }) => {
  const { pathname } = useLocation();
  const isLoginForm = pathname === "/auth/login";

  const emailId = useId();
  const passwordId = useId();

  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   const submitForm = useCallback(async (data) => {
    await trigger();
    onSubmit(data);
}, [onSubmit, trigger]);

   useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(submitForm)();
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleSubmit, submitForm]);

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit(submitForm)} className={styles.formWrapper} noValidate>
        <div className={styles.contentWrapper}>
          <div className={styles.switcher}>
            <NavLink to={"/auth/register"}>
              <button className={styles.button} disabled={!isLoginForm}>Registration</button>
            </NavLink>
            <button className={styles.button} disabled={isLoginForm}>Log In</button>
          </div>
          <div className={styles.inputContainer}>
            <input
              placeholder="Enter your email"
              className={styles.input}
              id={emailId}
              {...register("email")}
              type="email"
              required
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            <div className={styles.passwordContainer}>
              <input
                placeholder="Confirm your password"
                className={styles.passwordInput}
                id={passwordId}
                {...register("password")}
                type={showPassword ? "text" : "password"}
                required
              />
              <div className={styles.showPasswordButtonWrap}>
                <div
                  className={styles.showPasswordButton}
                  onClick={togglePasswordVisibility}
                >
                  <svg className={styles.logoIconOuterWrap}>
                    <use href={`${icon}#eye-icon`} className={styles.logoIconOuter}  />
                  </svg>
                </div>
              </div>
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            <button className={styles.loginButton} type="submit">
              Log In Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

