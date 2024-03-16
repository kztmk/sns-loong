import { lazy } from 'react';

import Loadable from '../components/Loadable';
import MainLayouts from '../layouts/MainLayout';
import AuthGuard from '../utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
// profiles
const AccountProfile = Loadable(lazy(() => import('../pages/profiles/')));
const AccountTabPersonal = Loadable(lazy(() => import('../sections/profiles/TabPersonal')));
const AccountTabPassword = Loadable(lazy(() => import('../sections/profiles/TabPassword')));
// const AccountTabSettings = Loadable(lazy(() => import('sections/profiles/TabSettings')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayouts />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      children: [
        {
          path: 'dashboard',
          element: <AccountTabPassword />,
        },
      ],
    },
    {
      path: 'profiles',
      children: [
        {
          path: 'account',
          element: <AccountProfile />,
          children: [
            { path: 'personal', element: <AccountTabPassword /> },
            {
              /* path: 'password', element: <AccountTabPassword /> },
          { path: 'settings', element: <AccountTabSettings /> */
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
