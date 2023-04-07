import React, { useState } from 'react';
import {
  FormField,
  Input,
  SpaceBetween,
  Button,
  Box,
  Container,
  Link,
  Alert,
  ColumnLayout,
} from '@cloudscape-design/components';
import CopyText from '../commons/copy-text';
import { useNavigate } from 'react-router-dom';

function SerialConsole({ state, id }) {
  const navigate = useNavigate();

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
        <SpaceBetween size="s">
          <Alert
            type="warning"
            statusIconAriaLabel="warning"
            header="This account is not authorized to use the EC2 serial console"
            action={<Button>Manage access</Button>}
          >
            To connect to this instance using the EC2 serial console, the
            instance must use an instance type that is built on the AWS Nitro
            System. This does not include bare metal instances. You can change
            the instance type to a supported instance type.
          </Alert>
          <ColumnLayout columns={2} variant="text-grid">
            <FormField label="Instance ID">
              <CopyText
                copyText={
                  <Link href={`/ec2_instance/instances/${id}`}>{id}</Link>
                }
                copyButtonLabel="Copy Instance ID"
                successText="Instance ID copied"
                errorText="Instance ID failed to copy"
              />
            </FormField>
            <FormField label="Serial port">
              <CopyText
                copyText={'ttyS0'}
                copyButtonLabel="Copy Serial port"
                successText="Serial port copied"
                errorText="Serial port failed to copy"
              />
            </FormField>
          </ColumnLayout>
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

export default SerialConsole;
