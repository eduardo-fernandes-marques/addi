import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { getLeadById, Lead as LeadProps } from '@api/leads';

import { Layout } from '@components/_Layout';
import { Button } from '@components/Button';
import { LabelledValue } from '@components/LabelledValue';
import { Loader } from '@components/Loader';
import { Spacing } from '@components/Spacing';
import { Title } from '@components/Title';

import { PAGE, NOMECLATURES } from '#/constants';
import { withFeedback, Props as WithFeedbackProps } from '#/hocs/withFeedback';

type Props = WithFeedbackProps;

type State = {
  loading: boolean;
  result?: LeadProps;
};

type Params = {
  id: string;
};

export const Detail: React.FC<Props> = ({ setError }) => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const { pathname } = useLocation();

  const type = useMemo(
    () => pathname.replace('/', '')?.split('/')?.shift()?.toUpperCase() ?? '',
    [pathname]
  );

  const [state, setState] = useState<State>({ loading: false });

  // eslint-disable-next-line consistent-return
  const fetch = useCallback(async () => {
    if (!id)
      return setError({
        children: `Please, try again later.`,
        primaryButton: {
          block: true,
          children: 'Back',
          onClick: () => navigate(PAGE.LIST[type].LIST()),
        },
        title: `Error to find ${type.toLowerCase()}`,
      });

    try {
      setState((context) => ({
        ...context,
        loading: true,
      }));

      const result = await getLeadById(id);

      setState((context) => ({
        ...context,
        loading: false,
        result,
      }));
    } catch (_) {
      setState((context) => ({
        ...context,
        loading: false,
      }));

      setError({
        children: `Please, try again later.`,
        primaryButton: {
          block: true,
          children: 'Back',
          onClick: () => navigate(PAGE.LIST[type].LIST()),
        },
        title: `Error to find ${type.toLowerCase()}`,
      });
    }
  }, [id, navigate, setError, type]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <Loader data-testid="loader" show={state.loading} fullScreen />

      <Title as="h1" size="large">
        {NOMECLATURES.DETAIL[type]}
      </Title>
      <Spacing appearance="medium" />

      <LabelledValue compact>
        <LabelledValue.Item label="ID" value={state?.result?.id} />
        <LabelledValue.Item label="Name" value={state?.result?.name} />
        <LabelledValue.Item label="Email" value={state?.result?.email} />
        <LabelledValue.Item label="Identity Number" value={state?.result?.identityNumber} />
        <LabelledValue.Item label="Birthday" value={state?.result?.birthDate} />

        {state?.result?.updatedAt && (
          <LabelledValue.Item label="Updated At" value={state?.result?.updatedAt} />
        )}

        {state?.result?.score && <LabelledValue.Item label="Score" value={state?.result?.score} />}

        {state?.result?.prospect && (
          <LabelledValue.Item label="Score" value={state?.result?.prospect} />
        )}
      </LabelledValue>
      <Spacing appearance="medium" />

      <Layout.Wrapper>
        <Button block appearance="primary" onClick={() => navigate(PAGE.LIST[type]())}>
          Back
        </Button>
      </Layout.Wrapper>
    </>
  );
};

export default withFeedback(Detail);
