import { isValidElement } from 'react';

import { Button } from '../Button';
import { Layout } from '../Layout';
import { Meta } from '../Meta';

import styles from './styles.module.scss';

export type Props = {
  icon: React.ReactNode;
  title: string;
  handleReset?: () => void;
  children: React.ReactNode;
  primaryButton?: React.ComponentProps<typeof Button>;
  secondaryButton?: React.ComponentProps<typeof Button>;
};

export const Feedback: React.FC<Props> = ({
  icon,
  title,
  children,
  handleReset,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <Layout>
      <Layout.Content>
        <Meta title={title} />

        <div className={styles.wrapper}>
          <span data-testid="feedback-icon">{icon}</span>

          <div data-testid="feedback-children">
            {isValidElement(children) ? children : <p>{children}</p>}
          </div>

          {primaryButton || secondaryButton ? (
            <>
              {secondaryButton && <Button ghost appearance="primary" {...secondaryButton} />}
              {primaryButton && <Button appearance="primary" {...primaryButton} />}
            </>
          ) : (
            <Button block appearance="primary" onClick={handleReset}>
              Back
            </Button>
          )}
        </div>
      </Layout.Content>
    </Layout>
  );
};
