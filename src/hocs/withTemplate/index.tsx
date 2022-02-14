import { useCallback, useReducer } from 'react';
import getDisplayName from 'react-display-name';
import { Subtract } from 'utility-types';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Layout } from '@components/Layout';

type Action = { type: 'SET_FILTER_VISIBLE' } | { type: 'FILTER_CHANGE'; payload: string };

export type Props = {
  filter?: string;
  setFilterVisible: () => void;
};

type State = {
  filter: {
    show: boolean;
    value?: string;
  };
};

const INITIAL_STATE = {
  filter: {
    show: false,
  },
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER_VISIBLE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          show: true,
        },
      };
    }

    case 'FILTER_CHANGE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          value: action.payload,
        },
      };
    }

    /* istanbul ignore next */
    default: {
      return state;
    }
  }
};

export const withTemplate = <P extends Props = Props>(Component: React.ComponentType<P>) => {
  const WithTemplate: React.FC<Subtract<P, Props>> = (props) => {
    const [
      {
        filter: { show, value: filter },
      },
      dispatch,
    ] = useReducer(reducer, INITIAL_STATE);

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();

      dispatch({ payload: event.target.value, type: 'FILTER_CHANGE' });
    }, []);

    return (
      <Layout>
        <Layout.Header>
          <Header show={show} onChange={handleOnChange} />
        </Layout.Header>
        <Layout.Content>
          <Component
            {...(props as P)}
            filter={filter}
            setFilterVisible={() => dispatch({ type: 'SET_FILTER_VISIBLE' })}
          />
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    );
  };

  WithTemplate.displayName = `${getDisplayName(WithTemplate)}(${getDisplayName(WithTemplate)})`;

  return WithTemplate;
};
