import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/login/index'));
const Layout = lazy(() => import('../pages/layout/index'));
const Overview = lazy(() => import('../pages/overview/index'));

const routes = (user = {}) => [
  {
    path: '/',
    element: user.role ? <Layout /> : <Navigate to="/login" />,
    children: [
      { path: '/', element: <Navigate to="/overview" /> },
      { path: '/overview', element: <Overview /> },
      // {
      //   path: 'member',
      //   element: <Outlet />,
      //   children: [
      //     { path: '/', element: <MemberGrid /> },
      //     { path: '/add', element: <AddMember /> },
      //   ],
      // },
    ],
  },
  {
    path: '/login',
    element: user.role ? <Navigate to="/" /> : <Login />,
  },
];

export default routes;
