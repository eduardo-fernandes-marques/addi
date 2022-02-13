import { lazy, Suspense } from 'react';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Server } from '@api/server';

import { Loader } from '@components/Loader';

import { PAGE } from '#/constants';

const LazyHome = lazy(() => import('@containers/Home'));
const LazyList = lazy(() => import('@containers/Protected/List'));
const LazyDetail = lazy(() => import('@containers/Protected/Detail'));

const LazyNotFound = lazy(() => import('@containers/NotFound'));

export const Routes: React.FC = () => {
  if (process.env.NODE_ENV === 'development') {
    Server();
  }

  return (
    <Router>
      <Suspense fallback={<Loader show fullScreen />}>
        <Switch>
          <Route path={PAGE.HOME()} element={<LazyHome />} />

          <Route path={PAGE.LIST.LEADS()} element={<LazyList />} />
          <Route path={PAGE.LIST.PROSPECTS()} element={<LazyList />} />

          <Route path={PAGE.DETAIL.LEADS(':id')} element={<LazyDetail />} />
          <Route path={PAGE.DETAIL.PROSPECTS(':id')} element={<LazyList />} />

          <Route path="*" element={<LazyNotFound />} />
        </Switch>
      </Suspense>
    </Router>
  );
};
