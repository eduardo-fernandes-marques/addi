import cn from 'clsx';
import { isValidElement, Children } from 'react';

import Container, { Props as ContainerProps } from './Container';
import Content, { Props as ContentProps } from './Content';
import styles from './styles.module.scss';
import Wrapper, { Props as WrapperProps } from './Wrapper';

export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = {
  Wrapper: React.FC<WrapperProps>;
  Content: React.FC<ContentProps>;
  Container: React.FC<ContainerProps>;
} & React.FC<DivProps>;

const Layout: Props = ({ children, className, ...props }) => {
  const isFull = !Children.toArray(children).some((component) => {
    return (
      isValidElement(component) &&
      (component as React.ReactElement<unknown>).type === Container.name
    );
  });

  return (
    <div
      className={cn(styles.layout, className, {
        [styles['-full']]: isFull,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

Layout.Wrapper = Wrapper;
Layout.Content = Content;
Layout.Container = Container;

export default Layout;
