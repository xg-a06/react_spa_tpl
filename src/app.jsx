import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DataProvider, { createStore } from '@/redux';
import { renderRoutes, RouteConfig } from './routes';

const Loading = <div>loading...</div>;
const store = createStore(process.env.BUILD_ENV);

const App = () => (
  <DataProvider store={store}>
    <Suspense fallback={Loading}>
      <Router>{renderRoutes(RouteConfig)}</Router>
    </Suspense>
  </DataProvider>
);

export default App;
