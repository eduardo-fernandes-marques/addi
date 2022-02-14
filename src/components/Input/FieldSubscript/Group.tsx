import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

const Group: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles.group, className)} {...props}>
      {children}
    </div>
  );
};

export default Group;
