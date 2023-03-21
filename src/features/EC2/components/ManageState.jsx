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
  Button,
} from '@awsui/components-react';
import { useNavigate } from 'react-router-dom';

function ItemState({ state }) {
  if (state === 'deleting') {
    return <Badge color="red">Deleting...</Badge>;
  } else if (state === 'Terminated') {
    return <Badge color="red">{state}</Badge>;
  } else if (state === 'Pending') {
    return <Badge>{state}</Badge>;
  }
  return <Badge color={state === 'Stopped' ? 'red' : 'green'}>{state}</Badge>;
}
function ManageState({ id, state }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };

  const [manage, setManage] = useState({});
  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Instance details</Header>}>
        <ColumnLayout columns={2}>
          <Link href={`/ec2_instance/instances/${id}`}>{id}</Link>
          <ItemState state={state.event} />
        </ColumnLayout>
      </Container>
      <Container header={<Header variant="h2">Instance state settings</Header>}>
        <ColumnLayout>
          <RadioGroup
            onChange={({ detail }) => setManage(detail.value)}
            value={manage}
            items={[
              {
                value: 'Start',
                label: 'Start',
                description: 'Available when the instance is stopped',
                disabled: state?.event === 'Running' ? true : false,
              },
              {
                value: 'Stop',
                label: 'Stop',
                disabled:
                  state?.event === 'Stopped' ||
                  state.event === 'Hibernate' ||
                  state.event === 'Terminate'
                    ? true
                    : false,
              },
              {
                value: 'Hibernate',
                label: 'Hibernate',
                description:
                  'This instance did not have Stop - Hibernate enabled at launch',
                disabled:
                  state?.event === 'Hibernate' ||
                  state.event === 'Stopped' ||
                  state.event === 'Running'
                    ? true
                    : false,
              },
              {
                value: 'Reboot',
                label: 'Reboot',
                disabled:
                  state?.event === 'Reboot' || state.event === 'Stopped'
                    ? true
                    : false,
              },
              {
                value: 'Terminate',
                label: 'Terminate',
                disabled: state?.event === 'Terminate' ? true : false,
              },
            ]}
          />
          {manage === 'Stop' && (
            <Alert
              type="warning"
              header="Note that when your instances are stopped:"
              dismissible
              dismissAriaLabel="stop-cancel"
            >
              Any data on the ephemeral storage of your instances will be lost.
            </Alert>
          )}
          {manage === 'Terminate' && (
            <Alert
              type="warning"
              header="Note that when your instances are terminated:"
              dismissible
              dismissAriaLabel="stop-cancel"
            >
              On an EBS-backed instance, the default action is for the root EBS
              volume to be deleted when the instance is terminated. Storage on
              any local drives will be lost.
            </Alert>
          )}
        </ColumnLayout>
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

export default ManageState;
