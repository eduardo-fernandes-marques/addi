import cn from 'clsx';
import { useEffect, useState } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { Button, Props as ButtonProps } from '@components/Button';
import { PlusCircleIcon } from '@components/Icons';
import { Title } from '@components/Title';

import styles from './styles.module.scss';

export type Props = {
  show: boolean;
  size?: 'small' | 'large';
  title: React.ReactNode;
  onClose?: () => void;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
} & Pick<ReactModalProps, Exclude<keyof ReactModalProps, 'isOpen'>>;

if (document && document.getElementById('root')) {
  ReactModal.setAppElement('#root');
}

const Modal: React.FC<Props> = ({
  show,
  size = 'large',
  title,
  onClose,
  children,
  className,
  primaryButton,
  secondaryButton,
  ...props
}) => {
  const [contentRef, setContentRef] = useState<HTMLDivElement>();

  useEffect(() => {
    if (!contentRef) return;

    setTimeout(() => {
      contentRef.focus();
    }, parseFloat('0.25s') * 1000);
  }, [contentRef]);

  return (
    <ReactModal
      isOpen={show}
      className={styles.modal}
      contentRef={setContentRef}
      onRequestClose={onClose}
      closeTimeoutMS={parseFloat('0.25s') * 1000}
      overlayClassName={{
        afterOpen: styles['-show'],
        base: cn(styles.modal, className, {
          [styles['-small']]: size === 'small',
          [styles['-large']]: size === 'large',
        }),
        beforeClose: styles['-hide'],
      }}
      bodyOpenClassName={styles['modal-show']}
      {...props}
    >
      <div className={styles.header}>
        <Title as="h2" className={cn(styles.title, className)}>
          {title}
        </Title>
        <button
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Fechar"
          data-close=""
        >
          <PlusCircleIcon title="plus-circle" />
        </button>
      </div>

      <div className={styles.body}>{children}</div>

      {(primaryButton || secondaryButton) && (
        <div className={styles.footer}>
          {secondaryButton && (
            <Button ghost onClick={onClose} appearance="primary" {...secondaryButton} />
          )}
          {primaryButton && <Button appearance="primary" {...primaryButton} />}
        </div>
      )}
    </ReactModal>
  );
};

export default Modal;
