import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary';
import { Optional } from 'utility-types';

import { Meta } from '#/components/Meta';

type Props = {
  title?: string;
};

export const Fallback: React.FC<Props> = ({
  title = 'Erro inesperado!',
  children = 'Por favor, tente novamente mais tarde.',
}) => {
  return (
    <>
      <Meta title={title} />
      {children}
    </>
  );
};

export const ErrorBoundary: React.FC<Optional<ErrorBoundaryPropsWithFallback, 'fallback'>> = (
  props
) => {
  return <ReactErrorBoundary fallback={<Fallback />} {...props} />;
};
