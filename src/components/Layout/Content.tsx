import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Content: React.FC<Props> = ({ children, className, ...props }) => (
  <main className={cn(styles.content, className)} {...props}>
    {children}
  </main>
);

export default Content;
