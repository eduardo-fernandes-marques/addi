import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';

import { PAGE } from '#/constants';

import { ErrorBoundary } from '.';

const Component = () => {
  const [showException, setShowException] = useState(false);

  if (showException) {
    throw new Error('Exception.');
  }

  return (
    <button
      type="button"
      aria-label="Exception"
      onClick={() => setShowException(true)}
      data-testid="set-exception"
    />
  );
};

type Config = {
  onError?: () => void;
};

const setup = (config?: Config) => {
  return render(
    <ErrorBoundary {...config}>
      <Component />
    </ErrorBoundary>
  );
};

describe('components > ErrorBoundary', () => {
  it('should show fallback when some exception happen', () => {
    const onError = jest.fn();

    const { getByTestId, queryByTestId } = setup({ onError });

    expect(queryByTestId('error-boundary-fallback-dismiss')).not.toBeInTheDocument();
    fireEvent.click(getByTestId('set-exception'));
    expect(getByTestId('error-boundary-fallback-dismiss')).toBeInTheDocument();
    fireEvent.click(getByTestId('error-boundary-fallback-dismiss'));
    expect(window.location.pathname).toBe(PAGE.HOME());
  });
});
