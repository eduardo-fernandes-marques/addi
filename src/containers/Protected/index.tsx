import { Navigate } from 'react-router-dom';

import { PAGE } from '#/constants';

export type Props = {
  outlet: JSX.Element;
};

const ProtectedRoute = ({ outlet }: Props) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated) {
    return outlet;
  }
  return <Navigate to={PAGE.LOGIN()} />;
};

export default ProtectedRoute;
