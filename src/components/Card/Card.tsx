import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  footer?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Card: React.FC<Props> = ({
  footer,
  children,
  className,
  as: Component = 'button',
  ...props
}) => {
  return (
    <div className={cn(styles.card, className)}>
      <Component className={styles.content} {...props}>
        {children}
      </Component>

      {!!footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
