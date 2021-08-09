import React from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { connect, effects } from '@/redux';
import routes from './config';

let cache = false;
const Routes = (props) => {
  const { checkLogin, auth } = props;
  if (!cache) {
    cache = true;
    throw checkLogin();
  }
  const routing = useRoutes(routes(auth));
  return <>{routing}</>;
};

const stateFn = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const actionFn = () => {
  const {
    auth: { checkLogin },
  } = effects;
  return {
    checkLogin,
  };
};

const RoutesContainer = connect(stateFn, actionFn)(Routes);

const Router = () => (
  <BrowserRouter>
    <RoutesContainer />
  </BrowserRouter>
);

export default Router;
