import { withFormik, FormikProps, FormikErrors } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { login, Login as LoginProps } from '@api/login';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Layout } from '@components/Layout';
import { Spacing } from '@components/Spacing';
import { Title } from '@components/Title';

import { AUTHENTICATION, PAGE } from '#/constants';
import { withTemplate, Props as WithTemplateProps } from '#/hocs/withTemplate';

import styles from './styles.module.scss';

type Props = WithTemplateProps;

type FormProps = { submit: string } & LoginProps;

const Login: React.FC<FormikProps<FormProps>> = ({
  handleSubmit,
  errors,
  handleBlur,
  touched,
  handleChange,
  submitCount,
  isValid,
}) => {
  const navigate = useNavigate();

  const isTouched = useCallback(
    (value: boolean) => {
      return value || !!submitCount;
    },
    [submitCount]
  );
  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTHENTICATION);

    if (isAuthenticated) navigate(PAGE.HOME());
  }, [navigate]);

  return (
    <>
      <Title as="h1" size="xxx-large">
        Login
      </Title>
      <Spacing appearance="medium" />
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <Input
          label="Email"
          name="email"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={isTouched(!!touched?.email) && errors?.email}
        />
        <Input
          label="password"
          type="password"
          name="password"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={isTouched(!!touched?.password) && errors?.password}
        />
        <Button appearance="primary" block type="submit" disabled={!isValid}>
          Log In
        </Button>
      </form>
      <Layout.Wrapper>
        <span className={styles.message}>{errors?.submit}</span>
      </Layout.Wrapper>
    </>
  );
};

export default withTemplate(
  withFormik<Props, FormProps>({
    enableReinitialize: true,
    handleSubmit: async (values, { setFieldError }) => {
      try {
        const result = await login(values);

        if (result === false) setFieldError('submit', 'User not found!');

        window.location.replace(PAGE.HOME());
      } catch (_) {
        setFieldError('submit', 'User not found!');
      }
    },
    validate: (values) => {
      const errors: FormikErrors<FormProps> = {};

      if (!values.email) {
        errors.email = 'Please, insert your email';
      }

      if (!values.password) {
        errors.password = 'Please, insert your password';
      }

      return errors;
    },
  })(Login)
);
