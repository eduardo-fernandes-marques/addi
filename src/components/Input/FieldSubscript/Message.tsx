import cn from 'clsx';

import styles from './styles.module.scss';

export interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  show?: boolean;
  invalid?: boolean;
}

const Message: React.FC<Props> = ({ show, invalid, children, className, ...props }) => {
  return (
    <p
      aria-hidden={show ? 'false' : 'true'}
      className={cn(styles.message, className, {
        [styles['-invalid']]: invalid,
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export default Message;
