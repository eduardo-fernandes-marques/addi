import * as React from 'react';
import cn from 'clsx';
import styles from '@sicredi/styles/_labelled-value.scss';

import Item, { Props as ItemProps } from './Item';

export type ChilProps = {
  Item: React.FC<ItemProps>;
}

export type Props = ChilProps & React.FC<{
  compact?: boolean;
} & React.HTMLAttributes<HTMLDListElement>>;

const LabelledValue: Props = ({ compact, children, className, ...props }) => (
  <dl
    className={cn(styles['labelled-value'], className, {
      [styles['-compact']]: compact,
    })}
    {...props}
  >
    {children}
  </dl>
);

LabelledValue.Item = Item;

export default LabelledValue;
