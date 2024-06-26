
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";


import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';


const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));


const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
          <Route element={<PublicRoute />}>
            <Route path="auth/:id" element={<AuthPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        <Route path="*" element={<NotFoundPage/> } />
        </Routes>
    </Suspense>

  )
}


export default AppRoutes

