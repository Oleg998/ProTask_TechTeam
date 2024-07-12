
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { current } from "../redux/auth/auth-operation";

import AppRoutes from "./AppRoutes";


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current())
  }, [dispatch]);

  return (
      <AppRoutes />
  );
};

