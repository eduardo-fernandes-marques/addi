import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary';
import { Optional } from 'utility-types';

import { Meta } from '../Meta';
import { Modal } from '../Modal';

import { PAGE } from '#/constants';

type Props = {
  title?: string;
  onClose?: () => void;
};

export const Fallback: React.FC<Props> = ({
  title = 'Unexpected error!',
  children = 'Please, try later.',
  onClose = () => {
    window.location.href = PAGE.HOME();
  },
}) => {
  return (
    <>
      <Meta title={title} />

      <Modal
        show
        title={title}
        onClose={onClose}
        primaryButton={{
          children: 'Try again',
          'data-testid': 'error-boundary-fallback-dismiss',
          onClick: onClose,
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export const ErrorBoundary: React.FC<Optional<ErrorBoundaryPropsWithFallback, 'fallback'>> = (
  props
) => {
  return <ReactErrorBoundary fallback={<Fallback />} {...props} />;
};
