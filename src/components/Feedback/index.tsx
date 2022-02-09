import React, { isValidElement } from 'react';

import { Meta } from '#/components/Meta';

import styles from './styles.module.scss';

export type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  // primaryButton?: React.ComponentProps<typeof Button>;
  // secondaryButton?: React.ComponentProps<typeof Button>;
};

export const Feedback: React.FC<Props> = ({
  icon,
  title,
  children,
  // primaryButton,
  // secondaryButton,
}) => {
  return (
    <>
      <Meta title={title} />

      <div className={styles.wrapper}>
        <span data-testid="feedback-icon">{icon}</span>

        <div data-testid="feedback-children">
          {isValidElement(children) ? children : <p>{children}</p>}
        </div>

        {/* {(primaryButton || secondaryButton) && (
          <>
            {secondaryButton && (
              <Button
                ghost
                appearance="primary"
                data-testid="feedback-primary-button"
                {...secondaryButton}
              />
            )}
            {primaryButton && (
              <Button
                appearance="primary"
                data-testid="feedback-secondary-button"
                {...primaryButton}
              />
            )}
          </>
        )} */}
      </div>

      <div />
    </>
  );
};
