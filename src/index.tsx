import { ErrorBoundary } from '#/components/ErrorBoundary';
import { App } from '#/containers/App';
import { unmountRender } from '#/utils/unmountRender';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ROOT = document.getElementById('root')!;

unmountRender(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  ROOT
);
