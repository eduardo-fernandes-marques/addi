import cn from 'clsx';

import Group, { Props as GroupProps } from './Group';
import Message, { Props as MessageProps } from './Message';
import styles from './styles.module.scss';

export type Props = {
  Group: React.FC<GroupProps>;
  Message: React.FC<MessageProps>;
} & React.FC<React.HTMLAttributes<HTMLDivElement>>;

const FieldSubscript: Props = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles['field-subscript'], className)} {...props}>
      {children}
    </div>
  );
};

FieldSubscript.Group = Group;
FieldSubscript.Message = Message;

export default FieldSubscript;
