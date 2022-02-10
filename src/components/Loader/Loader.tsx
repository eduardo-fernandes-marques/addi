import cn from 'clsx';

import styles from './styles.module.scss';

export type Props = {
  show: boolean;
  className?: string;
  fullScreen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Loader: React.FC<Props> = ({ show, className, fullScreen, ...props }) => (
  <div
    aria-busy={show ? 'true' : 'false'}
    aria-live="polite"
    className={cn(styles.loader, className, {
      [styles['-show']]: show,
      [styles['-full-screen']]: fullScreen,
    })}
    aria-label="Carregando..."
    aria-hidden={show ? 'false' : 'true'}
    {...props}
  >
    <div className={cn(styles.dots)}>
      <div className={cn(styles.dot)} />
      <div className={cn(styles.dot)} />
      <div className={cn(styles.dot)} />
    </div>
  </div>
);

export default Loader;
