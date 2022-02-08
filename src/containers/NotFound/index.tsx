type Props = {
  props: [];
};

const NotFound: React.FC<Props> = ({ props, children }) => {
  return (
    <>
      {children}
      {props}
    </>
  );
};

export default NotFound;
