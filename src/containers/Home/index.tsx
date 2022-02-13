import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { Spacing } from '@components/Spacing';
import { Title } from '@components/Title';

import { PAGE } from '#/constants';
import { withTemplate } from '#/hocs/withTemplate';

export const Home: React.FC = () => {
  return (
    <>
      <Title as="h1" size="large">
        Home
      </Title>
      <Spacing appearance="medium" />

      <Card
        as={Link}
        to={PAGE.LIST.LEADS()}
        title="Créditos contratados"
        data-testid="home-agreements"
      >
        Leads
      </Card>
      <Spacing appearance="small" />

      <Card
        as={Link}
        to={PAGE.LIST.PROSPECTS()}
        title="Créditos contratados"
        data-testid="home-agreements"
      >
        Prospects
      </Card>
    </>
  );
};

export default withTemplate(Home);
