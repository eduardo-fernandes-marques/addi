import cn from 'clsx';

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
  return (
    <div className={cn(styles.layout, className)} {...props}>
      {children}
    </div>
  );
};

Layout.Wrapper = Wrapper;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Header = Header;

export default Layout;
