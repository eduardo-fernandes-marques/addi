import { useState, useCallback, useEffect } from 'react';

import { getLeads, Leads, Lead, getLeadById } from '#/api/leads';

type State = Leads & Lead;

export const Home: React.FC = () => {
  const [state, setState] = useState<State>();

  const fetch = useCallback(async () => {
    const lead = await getLeadById('1');
    const { leads } = await getLeads();

    setState((context) => ({ ...context, ...lead, leads }));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      {state?.leads
        ? state.leads.map(({ name }) => <div key={name.first}>{name.first}</div>)
        : 'Não encontrado'}
    </div>
  );
};

export default Home;
