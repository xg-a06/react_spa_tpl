import { lazy } from 'react';

const List = lazy(() => import('../pages/list/index'));
const View = lazy(() => import('../pages/view/index'));

const RouteConfig = [
  {
    title: 'List',
    path: '/',
    key: 'index',
    exact: true,
    redirect: '/list',
  },
  {
    title: 'List',
    path: '/list',
    key: 'list',
    component: List,
    // redirect: '/list/studylist',
    // auth: {
    //   isAuth: true,
    //   roles: [3],
    // },
    // routes: [
    //   {
    //     title: 'Studylist',
    //     path: '/list/studylist',
    //     key: 'studylist',
    //     component: Studylist,
    //   },
    //   {
    //     title: 'Favoriteslist',
    //     path: '/list/favoriteslist',
    //     key: 'favoriteslist',
    //     component: Favoriteslist,
    //   },
    // ],
  },
  {
    title: 'View',
    path: '/view/:studyInstanceUID',
    key: 'viewer',
    component: View,
  },
];

export default RouteConfig;
