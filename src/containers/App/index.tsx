import { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';

import { Meta } from '#/components/Meta';
import { Routes } from '#/routes';

export const App: React.FC = hot(() => {
  return (
    <>
      <Meta />

      <main>
        <StrictMode>
          <Routes />
        </StrictMode>
      </main>
    </>
  );
});
