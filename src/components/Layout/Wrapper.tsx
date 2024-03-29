import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Wrapper: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={cn(styles.wrapper, className)} {...props}>
    {children}
  </div>
);

export default Wrapper;
