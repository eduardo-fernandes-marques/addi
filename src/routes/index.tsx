import { lazy, Suspense } from 'react';
import { Routes as Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Server } from '@api/server';

import { Loader } from '@components/Loader';
import ProtectedRoute from '@containers/Protected';

import { PAGE } from '#/constants';

const LazyHome = lazy(() => import('@containers/Home'));
const LazyList = lazy(() => import('@containers/Protected/List'));
const LazyDetail = lazy(() => import('@containers/Protected/Detail'));
const LazyLogin = lazy(() => import('@containers/Login'));

const LazyNotFound = lazy(() => import('@containers/NotFound'));

export const Routes: React.FC = () => {
  if (process.env.NODE_ENV === 'development') {
    Server();
  }

  return (
    <Router>
      <Suspense fallback={<Loader show fullScreen />}>
        <Switch>
          <Route path={PAGE.HOME()} element={<ProtectedRoute outlet={<LazyHome />} />} />
          <Route path={PAGE.LIST.LEADS()} element={<ProtectedRoute outlet={<LazyList />} />} />

          <Route path={PAGE.LIST.PROSPECTS()} element={<ProtectedRoute outlet={<LazyList />} />} />

          <Route
            path={PAGE.DETAIL.LEADS(':id')}
            element={<ProtectedRoute outlet={<LazyDetail />} />}
          />

          <Route
            path={PAGE.DETAIL.PROSPECTS(':id')}
            element={<ProtectedRoute outlet={<LazyDetail />} />}
          />

          <Route path={PAGE.LOGIN()} element={<LazyLogin />} />

          <Route path="*" element={<LazyNotFound />} />
        </Switch>
      </Suspense>
    </Router>
  );
};
