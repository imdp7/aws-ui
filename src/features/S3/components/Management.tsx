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
  CollectionPreferences,
  Pagination,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../common/localStorage';
import {
  COLUMN_DEFINITIONS,
  VISIBLE_CONTENT_OPTIONS,
  PAGE_SIZE_OPTIONS,
  SEARCHABLE_COLUMNS,
} from '../components/table-select-filter-config';

export const Lifecycle = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
        'name',
        'status',
        'scope',
        'currentVersion',
        'nonCurrentVersion',
        'expiredObjects',
        'multipart',
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );

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
      visibleColumns={preferences.visibleContent}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No lifecycle rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no lifecycle rules for this bucket.
          </Box>
          <Button
            ariaLabel="Create lifecycle rule"
            onClick={() =>
              navigate('management/lifecycle/create', {
                state: {
                  name: 'Create lifecycle rule',
                  title: 'Life cycle configuration',
                  head: 'lifecycle rule configuration',
                  info: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                },
              })
            }
          >
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
                disabled
                items={[
                  { text: 'Delete', id: 'rm', disabled: false },
                  { text: 'Move', id: 'mv', disabled: false },
                  { text: 'Rename', id: 'rn', disabled: true },
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button
                onClick={() =>
                  navigate('create', {
                    state: {
                      name: 'Create lifecycle rule',
                      title: 'Life cycle configuration',
                      head: 'lifecycle rule configuration',
                      description: `Use lifecycle rules to define actions you want Amazon S3 to take
              during an object's lifetime such as transitioning objects to
              another storage class, archiving them, or deleting them after a
              specified period of time.`,
                      des: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                    },
                  })
                }
              >
                Create Lifecycle rule
              </Button>
            </SpaceBetween>
          }
        >
          Lifecycle rules
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={1}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: [
                  {
                    id: 'name',
                    label: 'Lifecycle rule name',
                    editable: false,
                  },
                  { id: 'status', label: 'Status' },
                  { id: 'scope', label: 'Scope' },
                  {
                    id: 'currentVersion',
                    label: 'Current version actions',
                  },
                  {
                    id: 'nonCurrentVersion',
                    label: 'Current version actions',
                  },
                  {
                    id: 'expiredObjects',
                    label: 'Expired objects delete markers',
                  },
                  {
                    id: 'multipart',
                    label: 'Incomplete multipart uploads',
                  },
                ],
              },
            ],
          }}
        />
      }
    />
  );
};

export const Replication = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
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
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );

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
      header: 'Destination Region',
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
    {
      id: 'deleteMarker',
      header: 'Delete marker replication',
      cell: (e) => e.deleteMarker,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'metrics',
      header: 'Replication metrics',
      cell: (e) => e.metrics,
      width: 80,
      minWidth: 50,
    },
  ];

  return (
    <Table
      onChange={({ detail }) => setSelectedItems(detail.value)}
      items={[]}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      loading={loading}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      loadingText="Loading Resources"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Replication rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no Replication rules for this bucket.
          </Box>
          <Button
            ariaLabel="Create lifecycle rule"
            onClick={() =>
              navigate('management/replication/create', {
                state: {
                  name: 'Create replication rule',
                  title: 'Replication rules',
                  head: 'Create Replication rules',
                  description: `Use lifecycle rules to define actions you want Amazon S3 to take
              during an object's lifetime such as transitioning objects to
              another storage class, archiving them, or deleting them after a
              specified period of time.`,
                  des: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                },
              })
            }
          >
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
                  { text: 'Enable rule', id: 'rm', disabled: true },
                  { text: 'Disable rule', id: 'mv', disabled: true },
                  { text: 'Enable all', id: 'ea', disabled: true },
                  { text: 'Disable all', id: 'dl', disabled: true },
                  { text: 'Delete all', id: 'dll', disabled: true },
                  { text: 'Edit priority', id: 'ep', disabled: true },
                  { text: 'Receive replicated objects', id: 'rro' },
                ]}
              >
                Actions
              </ButtonDropdown>
              <Button
                onClick={() =>
                  navigate('create', {
                    state: {
                      name: 'Create replication rule',
                      title: 'Replication rules',
                      head: 'Create Replication rules',
                      description: `Use lifecycle rules to define actions you want Amazon S3 to take
              during an object's lifetime such as transitioning objects to
              another storage class, archiving them, or deleting them after a
              specified period of time.`,
                      des: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                    },
                  })
                }
              >
                Create Replication rule
              </Button>
            </SpaceBetween>
          }
        >
          Replication rules
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={1}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: [
                  {
                    id: 'name',
                    label: 'Replication rule name',
                    editable: false,
                  },
                  { id: 'status', label: 'Status' },
                  { id: 'destinationBucket', label: 'Destination bucket' },
                  {
                    id: 'destinationRegion',
                    label: 'Destination Region',
                  },
                  {
                    id: 'priority',
                    label: 'Priority',
                  },
                  {
                    id: 'scope',
                    label: 'Scope',
                  },
                  {
                    id: 'storageClass',
                    label: 'Storage class',
                  },
                  {
                    id: 'owner',
                    label: 'Replica owner',
                  },
                  {
                    id: 'timeControl',
                    label: 'Replica TIme Control',
                  },
                  {
                    id: 'kmsEncrypted',
                    label: 'KMS-encrypted objects',
                  },
                  {
                    id: 'modificationSync',
                    label: 'Replica modification sync',
                  },
                  {
                    id: 'metrics',
                    label: 'Replication metrics',
                  },
                  {
                    id: 'deleteMarker',
                    label: 'Delete marker replication',
                  },
                ],
              },
            ],
          }}
        />
      }
    />
  );
};

export const Inventory = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
        'name',
        'status',
        'scope',
        'destination',
        'frequency',
        'lastExport',
        'format',
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );

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
      visibleColumns={preferences.visibleContent}
      loading={loading}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Replication rules</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            There are no Inventory configuration for this bucket.
          </Box>
          <Button
            ariaLabel="Create inventory rule"
            onClick={() =>
              navigate('management/inventory/create', {
                state: {
                  name: 'Create inventory configuration',
                  title: 'Inventory configurations',
                  head: 'Create inventory configuration',
                  description: `You can create inventory configurations on a bucket to generate a flat file list of your objects and metadata. These scheduled reports can include all objects in the bucket or be limited to a shared prefix.`,
                  des: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                },
              })
            }
          >
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
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <Button disabled>Create job from manifest</Button>
              <Button
                onClick={() =>
                  navigate('create', {
                    state: {
                      name: 'Create inventory configuration',
                      title: 'Inventory configurations',
                      head: 'Create inventory configuration',
                      description: `You can create inventory configurations on a bucket to generate a flat file list of your objects and metadata. These scheduled reports can include all objects in the bucket or be limited to a shared prefix.`,
                      des: `Server-side encryption with Amazon S3 managed keys (SSE-S3) is the base level of encryption configuration for an Amazon S3 bucket. With server-side encryption, Amazon S3 encrypts a newly uploaded object in the bucket before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data.`,
                    },
                  })
                }
              >
                Create Inventory configuration
              </Button>
            </SpaceBetween>
          }
        >
          Inventory configurations
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={1}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: [
                  {
                    id: 'name',
                    label: 'Name',
                    editable: false,
                  },
                  { id: 'status', label: 'Status' },
                  { id: 'scope', label: 'Scope' },
                  {
                    id: 'destination',
                    label: 'Destination',
                  },
                  { id: 'frequency', label: 'Frequency' },
                  { id: 'lastExport', label: 'Last export' },
                  { id: 'format', label: 'Format' },
                ],
              },
            ],
          }}
        />
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
