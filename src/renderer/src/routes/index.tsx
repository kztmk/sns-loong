/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project-imports
import Loadable from '../components/Loadable';
import CommonLayout from '../layouts/CommonLayout';
// import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('../pages/landing')));

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes(): ReactElement<
  any,
  string | JSXElementConstructor<any>
> | null {
  return useRoutes([
    {
      path: '/',
      element: <CommonLayout layout="landing" />,
      children: [
        {
          path: '/',
          element: <PagesLanding />,
        },
      ],
    },
    LoginRoutes,
    //ComponentsRoutes,
    MainRoutes,
  ]);
}
