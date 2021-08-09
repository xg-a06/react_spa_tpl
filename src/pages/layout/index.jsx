import React from 'react';
import { Outlet } from 'react-router-dom';

const Index = () => (
  <div>
    <a href="/overview">overview</a>
    <Outlet />
  </div>
);

export default Index;
