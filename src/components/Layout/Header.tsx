import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLHeadingElement>;

const Header: React.FC<Props> = ({ children, className, ...props }) => (
  <header className={cn(styles.header, className)} {...props}>
    {children}
  </header>
);

export default Header;
