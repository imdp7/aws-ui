/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  Link,
  ButtonDropdown,
  Table,
  Box,
} from '@cloudscape-design/components';

const Lifecycle = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Lifecycle rule name',
      cell: (e) => e.name,
      width: 250,
      minWidth: 220,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (e) => e.status,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'scope',
      header: 'Scope',
      cell: (e) => e.scope,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'currentVersion',
      header: 'Current Version actions',
      cell: (e) => e.currentVersion,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'nonCurrentVersion',
      header: 'Noncurrent versions actions',
      cell: (e) => e.nonCurrentVersion,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'expiredObjects',
      header: 'Expired object delete markers',
      cell: (e) => e.expiredObjects,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'multipart',
      header: 'Incomplete multipart uploads',
      cell: (e) => e.multipart,
      width: 80,
      minWidth: 50,
    },
  ];

  const items = [];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <Table
      onChange={({ detail }) => setSelectedItems(detail.value)}
      items={items}
      columnDefinitions={columnDefinitions}
      loadingText="Loading Resources"
      loading={loading}
      visibleColumns={[
        'name',
        'status',
        'scope',
        'currentVersion',
        'nonCurrentVersion',
        'expiredObjects',
        'multipart',
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No lifecycle rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no lifecycle rules for this bucket.
          </Box>
          <Button ariaLabel="Create lifecycle rule" href="https://www.aws.com">
            Create lifecycle rule
          </Button>
        </Box>
      }
      header={
        <Header
          variant="h2"
          info={<Link>Info</Link>}
          counter="(0)"
          description={
            <>
              Use lifecycle rules to define actions you want Amazon S3 to take
              during an object's lifetime such as transitioning objects to
              another storage class, archiving them, or deleting them after a
              specified period of time. <Link external>Learn More</Link>
            </>
          }
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button
                iconName="refresh"
                onClick={handleRefresh}
                loading={loading}
                aria-label="Refresh"
              />
              <Button disabled>View Details</Button>
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <ButtonDropdown
                items={[
                  { text: 'Delete', id: 'rm', disabled: false },
                  { text: 'Move', id: 'mv', disabled: false },
                  { text: 'Rename', id: 'rn', disabled: true },
                  {
                    text: 'View metrics',
                    href: 'https://example.com',
                    external: true,
                    externalIconAriaLabel: '(opens in new tab)',
                  },
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button>Create Lifecycle rule</Button>
            </SpaceBetween>
          }
        >
          Lifecycle rules
        </Header>
      }
    />
  );
};

const Replication = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Replication rule name',
      cell: (e) => e.name,
      width: 250,
      minWidth: 220,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (e) => e.status,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'destinationBucket',
      header: 'Destination Bucket',
      cell: (e) => e.destinationBucket,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'destinationRegion',
      header: 'destinationRegion',
      cell: (e) => e.destinationRegion,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'priority',
      header: 'Priority',
      cell: (e) => e.priority,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'scope',
      header: 'Scope',
      cell: (e) => e.scope,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'storageClass',
      header: 'Storage Class',
      cell: (e) => e.storageClass,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'owner',
      header: 'Replica Owner',
      cell: (e) => e.owner,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'timeControl',
      header: 'Replica Time Control',
      cell: (e) => e.timeControl,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'kmsEncrypted',
      header: 'KNS-encrypted objects',
      cell: (e) => e.kmsEncrypted,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'modificationSync',
      header: 'Replica modification sync',
      cell: (e) => e.modificationSync,
      width: 80,
      minWidth: 50,
    },
  ];

  return (
    <Table
      onChange={({ detail }) => setSelectedItems(detail.value)}
      items={[]}
      columnDefinitions={columnDefinitions}
      loading={loading}
      loadingText="Loading Resources"
      visibleColumns={[
        'name',
        'status',
        'destinationBucket',
        'destinationRegion',
        'priority',
        'scope',
        'storageClass',
        'owner',
        'timeControl',
        'kmsEncrypted',
        'modificationSync',
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Replication rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no Replication rules for this bucket.
          </Box>
          <Button ariaLabel="Create lifecycle rule" href="https://www.aws.com">
            Create Replication rule
          </Button>
        </Box>
      }
      header={
        <Header
          variant="h2"
          info={<Link>Info</Link>}
          counter="(0)"
          description={
            <>
              Use replication rules to define options you want Amazon S3 to
              apply during replication such as server-side encryption, replica
              ownership, transitioning replicas to another storage class, and
              more. <Link external>Learn More</Link>
            </>
          }
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button
                iconName="refresh"
                onClick={handleRefresh}
                loading={loading}
                aria-label="Refresh"
              />
              <Button disabled>View Details</Button>
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <ButtonDropdown
                items={[
                  { text: 'Delete', id: 'rm', disabled: false },
                  { text: 'Move', id: 'mv', disabled: false },
                  { text: 'Rename', id: 'rn', disabled: true },
                  {
                    text: 'View metrics',
                    href: 'https://example.com',
                    external: true,
                    externalIconAriaLabel: '(opens in new tab)',
                  },
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button>Create Replication rule</Button>
            </SpaceBetween>
          }
        >
          Replication rules
        </Header>
      }
    />
  );
};

const Inventory = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Name',
      cell: (e) => e.name,
      width: 100,
      minWidth: 80,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (e) => e.status,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'scope',
      header: 'Scope',
      cell: (e) => e.scope,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'destination',
      header: 'Destination',
      cell: (e) => e.destination,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'frequency',
      header: 'Frequency',
      cell: (e) => e.frequency,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'lastExport',
      header: 'Last Export',
      cell: (e) => e.lastExport,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'format',
      header: 'Format',
      cell: (e) => e.format,
      width: 80,
      minWidth: 50,
    },
  ];

  return (
    <Table
      onChange={({ detail }) => setSelectedItems(detail.value)}
      items={[]}
      columnDefinitions={columnDefinitions}
      loadingText="Loading Resources"
      loading={loading}
      visibleColumns={[
        'name',
        'status',
        'scope',
        'destination',
        'frequency',
        'lastExport',
        'format',
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Replication rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no Inventory configuration for this bucket.
          </Box>
          <Button ariaLabel="Create lifecycle rule" href="https://www.aws.com">
            Create Inventory configuration
          </Button>
        </Box>
      }
      header={
        <Header
          variant="h2"
          info={<Link>Info</Link>}
          counter="(0)"
          description={
            <>
              You can create inventory configurations on a bucket to generate a
              flat file list of your objects and metadata. These scheduled
              reports can include all objects in the bucket or be limited to a
              shared prefix. <Link external>Learn More</Link>
            </>
          }
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button
                iconName="refresh"
                loading={loading}
                onClick={handleRefresh}
                aria-label="Refresh"
              />
              <Button disabled>View Details</Button>
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <ButtonDropdown
                items={[
                  { text: 'Delete', id: 'rm', disabled: false },
                  { text: 'Move', id: 'mv', disabled: false },
                  { text: 'Rename', id: 'rn', disabled: true },
                  {
                    text: 'View metrics',
                    href: 'https://example.com',
                    external: true,
                    externalIconAriaLabel: '(opens in new tab)',
                  },
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button>Create Inventory configuration</Button>
            </SpaceBetween>
          }
        >
          Inventory configurations
        </Header>
      }
    />
  );
};

const Management = () => {
  return (
    <SpaceBetween size="m">
      <Lifecycle />
      <Replication />
      <Inventory />
    </SpaceBetween>
  );
};

export default Management;
