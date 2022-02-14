import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  appearance: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  height?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Spacing: React.FC<Props> = ({ className, ...props }) => (
  <div
    style={{ height: props.height || undefined }}
    className={cn(styles.spacing, className, {
      [styles['-x-small']]: props.appearance === 'x-small',
      [styles['-small']]: props.appearance === 'small',
      [styles['-medium']]: props.appearance === 'medium',
      [styles['-large']]: props.appearance === 'large',
      [styles['-x-large']]: props.appearance === 'x-large',
    })}
    {...props}
  />
);

export default Spacing;
