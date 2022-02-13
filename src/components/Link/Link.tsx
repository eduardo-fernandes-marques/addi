import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

export type Props = LinkProps & { to: string };

const Anchor: React.FC<Props> = ({ to, onClick, ...props }) => {
  const handleClick: Props['onClick'] = (event) => {
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      // fix jest issue: https://github.com/facebook/jest/issues/890
      Object.defineProperty(window.location, 'href', { value: to });
    }

    onClick && onClick(event);
  };

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} onClick={handleClick} {...props} />;
};

const Link: React.FC<Props> = (props) => {
  const { to } = props;

  const isExternal = /^https?:\/\//.test(to);

  return isExternal ? <Anchor {...props} /> : <ReactRouterLink {...props} />;
};

export default Link;
