import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  label: React.ReactNode;
  value: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Item: React.FC<Props> = ({ label, value, className, ...props }) => {
  return (
    <div className={cn(styles.item, className)} {...props}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
};

export default Item;
