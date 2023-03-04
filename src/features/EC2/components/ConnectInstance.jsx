import React, { useState } from 'react';
import {
  Container,
  ColumnLayout,
  Link,
  Badge,
  SpaceBetween,
  Header,
  Alert,
  RadioGroup,
  Tabs,
  Button,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

function ConnectInstance({ id, state }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTabId, setActiveTabId] = React.useState('first');

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };
  return (
    <SpaceBetween size="l">
      <Container>
        <Tabs
          onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
          activeTabId={activeTabId}
          tabs={[
            {
              label: 'EC2 Instance Connect',
              id: 'first',
              content: <ConnectInstance id={id} state={state} />,
            },
            {
              label: 'Session Manager',
              id: 'second',
              content: 'Second tab content area',
            },
            {
              label: 'SSH Client',
              id: 'third',
              content: 'Third tab content area',
            },
            {
              label: 'EC2 Serial console',
              id: 'fourth',
              content: 'Third tab content area',
            },
          ]}
        />
      </Container>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Change State
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default ConnectInstance;
