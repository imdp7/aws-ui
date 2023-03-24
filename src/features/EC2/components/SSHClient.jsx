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
} from '@awsui/components-react';
import CopyText from '../commons/copy-text';
import { useNavigate } from 'react-router-dom';

function SSHClient({ state, id }) {
  const navigate = useNavigate();

  return (
    <SpaceBetween size="m">
      <Container>
        <SpaceBetween size="s">
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
          <ol>
            <SpaceBetween size="xxs">
              <li>Open an SSH client.</li>
              <li>
                Locate your private key file. The key used to launch this
                instance is test.pem
              </li>
              <li>
                <Box>
                  Run this command, if necessary, to ensure your key is not
                  publicly viewable.
                </Box>
                <CopyText
                  copyText={'chmod 400 test.pem'}
                  copyButtonLabel="Copy Command"
                  successText="Command copied"
                  errorText="Command failed to copy"
                />
              </li>
              <li>
                <Box>
                  Locate your private key file. The key used to launch this
                  instance is test.pem
                </Box>
                <CopyText
                  copyText={'ec2-54-161-254-232.compute-1.amazonaws.com'}
                  copyButtonLabel="Copy Command"
                  successText="Command copied"
                  errorText="Command failed to copy"
                />
              </li>
            </SpaceBetween>
          </ol>
          <Box>Example:</Box>
          <CopyText
            copyText={
              'ssh -i "test.pem" ec2-user@ec2-54-161-254-232.compute-1.amazonaws.com'
            }
            copyButtonLabel="Copy Command"
            successText="Command copied"
            errorText="Command failed to copy"
          />
          <Alert type="info" statusIconAriaLabel="info">
            Note: In most cases, the guessed user name is correct. However, read
            your AMI usage instructions to check if the AMI owner has changed
            the default AMI user name.
          </Alert>
        </SpaceBetween>
      </Container>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default SSHClient;
