/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export RouteConfig from './config';

const RouteContext = createContext([]);

const renderRoutes = (routes, switchProps = {}, extraProps = {}) => {
  if (routes && routes.length > 0) {
    return (
      <Switch {...switchProps}>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
              if (route.redirect) {
                return <Redirect to={route.redirect} />;
              }
              return (
                <RouteContext.Provider value={route.routes}>
                  <route.component {...props} {...extraProps} route={route} />
                </RouteContext.Provider>
              );
            }}
          />
        ))}
      </Switch>
    );
  }
  return null;
};

const RouterView = () => {
  const routes = useContext(RouteContext);
  return renderRoutes(routes);
};

export { renderRoutes, RouterView };
