import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<Props> = ({ children, className, ...props }) => (
  <footer className={cn(styles.header, className)} {...props}>
    {children}
  </footer>
);

export default Footer;
