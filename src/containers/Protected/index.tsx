import { Navigate } from 'react-router-dom';

import { AUTHENTICATION, PAGE } from '#/constants';

export type Props = {
  outlet: JSX.Element;
};

const ProtectedRoute = ({ outlet }: Props) => {
  const isAuthenticated = localStorage.getItem(AUTHENTICATION);

  if (isAuthenticated) {
    return outlet;
  }
  return <Navigate to={PAGE.LOGIN()} />;
};

export default ProtectedRoute;
