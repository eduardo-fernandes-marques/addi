import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  block?: boolean;
  ghost?: boolean;
  as?: React.ElementType;
  appearance?: 'primary' | 'danger';
  disabled?: boolean;
  [key: string]: unknown;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  block,
  ghost,
  as: Component = 'button',
  disabled,
  children,
  className,
  appearance,
  ...props
}) => (
  <Component
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    aria-disabled={disabled ? 'true' : 'false'}
    className={cn(styles.button, className, {
      [styles['-block']]: block,
      [styles['-ghost']]: ghost,
      [styles['-primary']]: appearance === 'primary',
      [styles['-error']]: appearance === 'danger',
    })}
    // eslint-disable-next-line react/button-has-type
    type={props.type ?? 'button'}
    {...props}
  >
    {children}
  </Component>
);

export default Button;
