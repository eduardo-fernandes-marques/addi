import { StrictMode } from 'react';

import { Meta } from '@components/Meta';

import { Routes } from '#/routes';

export const App: React.FC = () => {
  return (
    <>
      <Meta title="Addi Challenge" />
      <StrictMode>
        <Routes />
      </StrictMode>
    </>
  );
};
