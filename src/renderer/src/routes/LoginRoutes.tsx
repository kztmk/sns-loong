import { lazy } from 'react';

// project-imports
import Loadable from '../components/Loadable';
import CommonLayout from '../layouts/CommonLayout';
import GuestGuard from '../utils/route-guard/GuestGuard';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/auth/login')));
const AuthForgotPassword = Loadable(lazy(() => import('../pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('../pages/auth/reset-password')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: <AuthLogin />,
        },

        {
          path: 'forgot-password',
          element: <AuthForgotPassword />,
        },

        {
          path: 'reset-password',
          element: <AuthResetPassword />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
