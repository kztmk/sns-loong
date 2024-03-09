import { lazy } from 'react';

import Loadable from '../components/Loadable';
import MainLayouts from '../layouts/MainLayout';
import AuthGuard from '../utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

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
          element: <Dashboard />,
        },
      ],
    },
  ],
};

export default MainRoutes;
