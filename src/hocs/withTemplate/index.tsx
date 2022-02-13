import getDisplayName from 'react-display-name';
import { Subtract } from 'utility-types';

import { Layout } from '@components/Layout';

type Props = Record<string, unknown>;

export const withTemplate = <P extends Props = Props>(Component: React.ComponentType<P>) => {
  const WithTemplate: React.FC<Subtract<P, Props>> = (props) => {
    return (
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>
          <Component {...(props as P)} />
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    );
  };

  WithTemplate.displayName = `${getDisplayName(WithTemplate)}(${getDisplayName(WithTemplate)})`;

  return WithTemplate;
};
