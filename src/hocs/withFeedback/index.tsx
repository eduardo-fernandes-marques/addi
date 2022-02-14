import { useReducer } from 'react';
import getDisplayName from 'react-display-name';
import { Subtract } from 'utility-types';

import { Feedback, Props as FeedbackProps } from '@components/Feedback';
import { EmojiSadIcon, EmojiHappyIcon } from '@components/Icons';

type Type = 'ERROR' | 'SUCCEEDED';

type FeedbackPropsWithoutIcon = Omit<FeedbackProps, 'icon'>;

type State =
  | Partial<{ type?: Type; payload: FeedbackPropsWithoutIcon }>
  | Partial<{ type: 'EXCEPTION'; payload: string }>;

type Action =
  | { type: 'EXCEPTION'; payload: string }
  | { type: Type; payload: FeedbackPropsWithoutIcon }
  | { type: 'RESET' };

export type Props = {
  setError: (payload: FeedbackPropsWithoutIcon) => void;
  setSucceeded: (payload: FeedbackPropsWithoutIcon) => void;
  setException: (payload: string) => void;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'RESET': {
      return {};
    }

    case 'ERROR': {
      return {
        ...state,
        payload: {
          ...action.payload,
          icon: <EmojiSadIcon title="emoji-sad" aria-hidden="true" className="icon-info" />,
        },
        type: action.type,
      };
    }

    case 'SUCCEEDED': {
      return {
        ...state,
        payload: {
          ...action.payload,
          icon: <EmojiHappyIcon title="emoji-happy" aria-hidden="true" className="icon-info" />,
        },
        type: action.type,
      };
    }

    case 'EXCEPTION': {
      return { ...state, payload: action.payload, type: action.type };
    }
    /* istanbul ignore next */
    default: {
      return state;
    }
  }
};

export const withFeedback = <P extends Props = Props>(Component: React.ComponentType<P>) => {
  const WithFeedback: React.FC<Subtract<P, Props>> = (props) => {
    const [state, dispatch] = useReducer(reducer, {});

    if (state?.type === 'EXCEPTION') throw new Error(state.payload);

    return state?.type ? (
      <Feedback
        {...(state.payload as FeedbackProps)}
        handleReset={() => dispatch({ type: 'RESET' })}
      />
    ) : (
      <Component
        {...(props as P)}
        setError={(payload) => dispatch({ payload, type: 'ERROR' })}
        setSucceeded={(payload) => dispatch({ payload, type: 'SUCCEEDED' })}
        setException={(payload) => dispatch({ payload, type: 'EXCEPTION' })}
      />
    );
  };

  WithFeedback.displayName = `${getDisplayName(WithFeedback)}(${getDisplayName(Component)})`;

  return WithFeedback;
};
