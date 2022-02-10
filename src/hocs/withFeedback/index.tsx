import React, { useReducer } from 'react';
import getDisplayName from 'react-display-name';
import { Subtract } from 'utility-types';

import { Feedback, Props as FeedbackProps } from '#/components/Feedback';

type Type = 'ERROR' | 'SUCCEEDED';

type FeedbackPropsWithoutIcon = Omit<FeedbackProps, 'icon'>;

type State =
  | Partial<{ type: Type; payload: FeedbackPropsWithoutIcon }>
  | Partial<{ type: 'CUSTOM'; payload: FeedbackProps }>
  | Partial<{ type: 'EXCEPTION'; payload: string }>;

type Action =
  | { type: Type; payload: FeedbackPropsWithoutIcon }
  | { type: 'CUSTOM'; payload: FeedbackProps }
  | { type: 'EXCEPTION'; payload: string };

export type Props = {
  setError: (payload: FeedbackPropsWithoutIcon) => void;
  setFeedback: (payload: FeedbackProps) => void;
  setSucceeded: (payload: FeedbackPropsWithoutIcon) => void;
  setException: (payload: string) => void;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        payload: { ...action.payload },
        type: action.type,
      };
    }
    case 'CUSTOM': {
      return {
        ...state,
        payload: action.payload,
        type: action.type,
      };
    }
    case 'SUCCEEDED': {
      return {
        ...state,
        payload: {
          ...action.payload,
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
      <Feedback {...(state.payload as FeedbackProps)} />
    ) : (
      <Component
        {...(props as P)}
        setError={(payload) => dispatch({ payload, type: 'ERROR' })}
        setFeedback={(payload) => dispatch({ payload, type: 'CUSTOM' })}
        setSucceeded={(payload) => dispatch({ payload, type: 'SUCCEEDED' })}
        setException={(payload) => dispatch({ payload, type: 'EXCEPTION' })}
      />
    );
  };

  WithFeedback.displayName = `${getDisplayName(WithFeedback)}(${getDisplayName(Component)})`;

  return WithFeedback;
};
