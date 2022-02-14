import cn from 'clsx';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Input } from '../Input';

import { Button } from '@components/Button';
import { Layout } from '@components/Layout';

import { AUTHENTICATION, PAGE } from '#/constants';

import styles from './styles.module.scss';

type Props = {
  show: boolean;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ onChange, show = false }) => {
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => localStorage.getItem(AUTHENTICATION), []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTHENTICATION);

    navigate(PAGE.LOGIN());
  }, [navigate]);

  return (
    <div className={cn(styles.header, { [styles['-without-filter']]: !show })}>
      {show && (
        <Layout.Wrapper>
          <Input label="filter" onChange={(value) => onChange(value)} />
        </Layout.Wrapper>
      )}
      {isAuthenticated && (
        <Layout.Wrapper>
          <Button appearance="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Layout.Wrapper>
      )}
    </div>
  );
};

export default Header;
