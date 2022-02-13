import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { PAGE } from '#/constants';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated) navigate(PAGE.HOME());
  }, [navigate]);

  return (
    <form>
      <Input label="Email" />
      <Input label="password" type="password" />
      <Button appearance="primary" block type="submit">
        Log In
      </Button>
    </form>
  );
};

export default Login;
