import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Content: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={cn(styles.content, className)} {...props}>
    {children}
  </div>
);

export default Content;
