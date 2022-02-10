import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  block?: boolean;
  ghost?: boolean;
  square?: boolean;
  appearance?: 'primary' | 'danger';
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  block,
  ghost,
  square,
  disabled,
  children,
  className,
  appearance,
  ...props
}) => (
  <button
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    aria-disabled={disabled ? 'true' : 'false'}
    className={cn(styles.button, className, {
      [styles['-block']]: block,
      [styles['-ghost']]: ghost,
      [styles['-square']]: square,
      [styles['-primary']]: appearance === 'primary',
      [styles['-error']]: appearance === 'danger',
    })}
    // eslint-disable-next-line react/button-has-type
    type={props.type ?? 'button'}
    {...props}
  >
    {children}
  </button>
);

export default Button;
