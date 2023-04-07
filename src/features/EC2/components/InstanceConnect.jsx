import React, { useState } from 'react';
import {
  FormField,
  Input,
  SpaceBetween,
  Button,
  Container,
  Alert,
} from '@cloudscape-design/components';
import CopyText from '../commons/copy-text';
import { useNavigate } from 'react-router-dom';

function InstanceConnect({ state, id }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('ec2-user');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };
  return (
    <SpaceBetween size="m">
      <Container>
        <SpaceBetween size="m">
          <FormField label="Instance ID">
            <CopyText
              copyText={id}
              copyButtonLabel="Copy Instance ID"
              successText="Instance ID copied"
              errorText="Instance ID failed to copy"
            />
          </FormField>
          <FormField label="Public IP address">
            <CopyText
              copyText={'54.161.254.232'}
              copyButtonLabel="Copy Public IP address"
              successText="Public IP address copied"
              errorText="Public IP address failed to copy"
            />
          </FormField>
          <FormField
            label="User name"
            description="Enter the user name defined in the AMI used to launch the instance. If you didn't define a custom user name, use the default user name, ec2-user."
          >
            <Input
              value={username}
              onChange={({ detail }) => setUsername(detail.value)}
              placeholder="Custom user name"
            />
          </FormField>
          <Alert type="info" statusIconAriaLabel="info">
            Note: In most cases, the default user name, ec2-user, is correct.
            However, read your AMI usage instructions to check if the AMI owner
            has changed the default AMI user name.
          </Alert>
        </SpaceBetween>
      </Container>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Connect
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default InstanceConnect;
