import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={cn(styles.container, className)} {...props}>
    {children}
  </div>
);

export default Container;
