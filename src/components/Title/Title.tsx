import cn from 'clsx';
import * as React from 'react';

import styles from './styles.module.scss';

export type Props = {
  as?: React.ElementType<React.HTMLAttributes<HTMLHeadingElement>>;
  size?: 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';
  weight?: 'x-light' | 'light' | 'normal' | 'semi-bold' | 'bold';
  appearance?: 'primary' | 'secondary';
} & React.HTMLAttributes<HTMLHeadingElement>;

const Title: React.FC<Props> = ({
  as: Component = 'h1',
  size,
  className,
  appearance,
  weight,
  ...props
}) => (
  <Component
    className={cn(styles.title, className, {
      [styles['-primary']]: appearance === 'primary',
      [styles['-secondary']]: appearance === 'secondary',
      [styles['-medium']]: size === 'medium',
      [styles['-large']]: size === 'large',
      [styles['-x-large']]: size === 'x-large',
      [styles['-xx-large']]: size === 'xx-large',
      [styles['-xxx-large']]: size === 'xxx-large',
      [styles['-x-light']]: weight === 'x-light',
      [styles['-light']]: weight === 'light',
      [styles['-normal']]: weight === 'normal',
      [styles['-semi-bold']]: weight === 'semi-bold',
      [styles['-bold']]: weight === 'bold',
    })}
    {...props}
  />
);

export default Title;
