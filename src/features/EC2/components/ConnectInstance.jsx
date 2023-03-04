import React, { useState, useEffect } from 'react';
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
  Spinner,
  Button,
} from '@cloudscape-design/components';
import InstanceConnect from './InstanceConnect';
import SSHClient from './SSHClient';
import SerialConsole from './SerialConsole';

function ConnectInstance({ id, state }) {
  const [activeTabId, setActiveTabId] = useState('ec2InstanceConnect');
  const [loading, setLoading] = useState('false');
  useEffect(() => {
    document.title = 'Connect to instance | EC2 Management Console';
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {!loading ? (
        <SpaceBetween size="l">
          <Tabs
            onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
            activeTabId={activeTabId}
            tabs={[
              {
                label: 'EC2 Instance Connect',
                id: 'ec2InstanceConnect',
                content: <InstanceConnect id={id} state={state} />,
              },
              {
                label: 'Session Manager',
                id: 'sessionManager',
                content: 'Second tab content area',
              },
              {
                label: 'SSH Client',
                id: 'sshClient',
                content: <SSHClient id={id} state={state} />,
              },
              {
                label: 'EC2 Serial console',
                id: 'ec2SerialConsole',
                content: <SerialConsole id={id} state={state} />,
              },
            ]}
          />
        </SpaceBetween>
      ) : (
        <Spinner classNmae="spinner" size="large" />
      )}
    </>
  );
}

export default ConnectInstance;
