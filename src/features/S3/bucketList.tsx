/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Content } from '../EC2/commons/Home';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
  Spinner,
  Header,
  Box,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
  BreadcrumbGroup,
  Button,
} from '@cloudscape-design/components';
import { Provider } from 'react-redux';
import { appLayoutLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';

const TableContent = ({ loadHelpPanelContent }) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <SpaceBetween size="xxs">
      <Table
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        stripedRows
        variant="container"
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: 'Items selection',
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? 'item' : 'items'
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(
              (i) => i.name === item.name
            ).length;
            return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
          },
        }}
        columnDefinitions={[
          {
            id: 'name',
            header: 'Name',
            cell: (e) => e.name,
            sortingField: 'name',
          },
          {
            id: 'aws-region',
            header: 'AWS Region',
            cell: (e) => e.alt,
            sortingField: 'alt',
          },
          {
            id: 'access',
            header: 'Access',
            cell: (e) => e.type,
            sortingField: 'description',
          },
          {
            id: 'createdAt',
            header: 'Creation Date',
            cell: (e) => e.size,
            sortingField: 'alt',
          },
        ]}
        items={[
          {
            name: 'Item 1',
            alt: 'First',
            description: 'This is the first item',
            type: '1A',
            size: 'Small',
          },
          {
            name: 'Item 2',
            alt: 'Second',
            description: 'This is the second item',
            type: '1B',
            size: 'Large',
          },
          {
            name: 'Item 3',
            alt: 'Third',
            description: '-',
            type: '1A',
            size: 'Large',
          },
          {
            name: 'Item 4',
            alt: 'Fourth',
            description: 'This is the fourth item',
            type: '2A',
            size: 'Small',
          },
          {
            name: 'Item 5',
            alt: '-',
            description: 'This is the fifth item with a longer description',
            type: '2A',
            size: 'Large',
          },
          {
            name: 'Item 6',
            alt: 'Sixth',
            description: 'This is the sixth item',
            type: '1A',
            size: 'Small',
          },
        ]}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="name"
        visibleColumns={['name', 'aws-region', 'access', 'createdAt']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find buckets by name"
            filteringText=""
          />
        }
        header={
          <Header
            description="Buckets are containers for data stored in S3"
            counter={
              selectedItems.length
                ? '(' + selectedItems.length + '/10)'
                : '(10)'
            }
            actions={
              <SpaceBetween size="m" direction="horizontal">
                <Button
                  ariaExpanded
                  loading={loading}
                  iconName="refresh"
                  onClick={handleRefresh}
                />
                <Button iconName="copy" disabled>
                  Copy ARN
                </Button>
                <Button disabled>Empty</Button>
                <Button>Delete</Button>
                <Button variant="primary">Create Bucket</Button>
              </SpaceBetween>
            }
          >
            Buckets
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={1}
            pagesCount={2}
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
            preferences={{
              pageSize: 10,
              visibleContent: ['name', 'aws-region', 'access', 'createdAt'],
            }}
            pageSizePreference={{
              title: 'Select page size',
              options: [
                { value: 10, label: '10 resources' },
                { value: 20, label: '20 resources' },
              ],
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
                    { id: 'aws-region', label: 'AWS Region' },
                    { id: 'access', label: 'Access' },
                    {
                      id: 'createdAt',
                      label: 'Created At',
                    },
                  ],
                },
              ],
            }}
          />
        }
      />
    </SpaceBetween>
  );
};

export default function BucketList(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Buckets"
      info="Buckets are containers for objects stored in Amazon S3. You can store any number of objects in a bucket and can have up to 100 buckets in your account. To request an increase, visit the Service Quotas Console . You can create, configure, empty, and delete buckets. However, you can only delete an empty bucket."
      ul={[
        {
          h5: 'Manage access',
          text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
        },
        {
          h5: 'Configure your bucket',
          text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
        },
        {
          h5: 'Understand storage usage and activity',
          text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
        },
      ]}
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'S3 Management Console';
  }, [location]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: 'home' },
              { text: 'Buckets', href: 'bucket' },
            ]}
          />
        }
        navigation={
          <Navigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={S3navItems}
            header={S3Header}
          />
        }
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        content={
          <SpaceBetween size="l">
            <ContentLayout
              header={
                <DashboardHeader
                  loadHelpPanelContent={loadHelpPanelContent}
                  title="Buckets"
                  info="Buckets are containers for objects stored in Amazon S3. You can store any number of objects in a bucket and can have up to 100 buckets in your account. To request an increase, visit the Service Quotas Console . You can create, configure, empty, and delete buckets. However, you can only delete an empty bucket."
                  ul={[
                    {
                      h5: 'Manage access',
                      text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
                    },
                    {
                      h5: 'Configure your bucket',
                      text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
                    },
                    {
                      h5: 'Understand storage usage and activity',
                      text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
                    },
                  ]}
                />
              }
            />
            <TableContent loadHelpPanelContent={loadHelpPanelContent} />
          </SpaceBetween>
        }
      />
      <AppFooter />
    </>
  );
}
