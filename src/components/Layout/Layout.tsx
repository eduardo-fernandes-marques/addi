import cn from 'clsx';
import { Children, isValidElement, useMemo } from 'react';

import Content, { Props as ContentProps } from './Content';
import Footer, { Props as FooterProps } from './Footer';
import Header, { Props as HeaderProps } from './Header';
import styles from './styles.module.scss';
import Wrapper, { Props as WrapperProps } from './Wrapper';

export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = {
  Wrapper: React.FC<WrapperProps>;
  Content: React.FC<ContentProps>;
  Footer: React.FC<FooterProps>;
  Header: React.FC<HeaderProps>;
} & React.FC<DivProps>;

const Layout: Props = ({ children, className, ...props }) => {
  const isSimple = useMemo(
    () =>
      !Children.toArray(children).some(
        (component) =>
          isValidElement(component) &&
          (component as unknown as JSX.Element).type.name === Header.name
      ),

    [children]
  );

  console.log(!isSimple);

  return (
    <div className={cn(styles.layout, className, { [styles['-simple']]: !isSimple })} {...props}>
      {children}
    </div>
  );
};

Layout.Wrapper = Wrapper;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Header = Header;

export default Layout;
