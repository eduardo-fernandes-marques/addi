import React, { lazy, Suspense } from 'react';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Server } from '#/api/server';
import { PAGE } from '#/constants';

const LazyHome = lazy(() => import('#/containers/Home'));
const LazyNotFound = lazy(() => import('#/containers/NotFound'));

export const Routes: React.FC = () => {
  if (process.env.NODE_ENV === 'development') {
    Server();
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading... </div>}>
        <Switch>
          <Route path={PAGE.ROOT()} element={<LazyHome />} />
          <Route path="*" element={<LazyNotFound />} />
        </Switch>
      </Suspense>
    </Router>
  );
};
