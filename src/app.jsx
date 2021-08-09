import React, { Suspense } from 'react';
import DataProvider, { createStore } from '@/redux';
import Router from './routes';

const Loading = <div>loading...</div>;
const store = createStore(process.env.BUILD_ENV);

const App = () => (
  <DataProvider store={store}>
    <Suspense fallback={Loading}>
      <Router />
    </Suspense>
  </DataProvider>
);

export default App;
